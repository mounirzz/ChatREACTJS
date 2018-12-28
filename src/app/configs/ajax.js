import axios from 'axios'
import { hashHistory } from 'react-router'
import { timeout, baseURL } from '@config'
import { message } from 'antd'
import { parseQueryString } from './common'

const { CancelToken } = axios
let baseConfig = {

  url: '/',
  method: 'post',
  baseURL: '',
  hearder: {
    'Content-Type':'text/plain'
  },
  params : {},
  data:{},
  timeout:'',
  withCredentials:true,
  responseType:'json',
  maxCententLenght:2000,
  validateStatus(status){
    return >= 200 && status < 300
  },
}
baseConfig = { ...baseConfig, timeout: timeout, baseURL : baseURL }

export const oftenFetchByPost = (api, option) => {
  if (typeof api === 'function') return api
  return (...rest) => {
    const data = rest[0] | {}
    const token = sessionStorage.getItem('token')
    if (token) {
      // data.token = token
    }
    let success = null
    let failure = null
    let config = null
    for (let i = 1; i < rest.length; i+=1) {
      if (typeof rest[i] === 'function') {
        if (!success) {
          success = rest[i]
        }else {
          failure = rest[i]
        }
      }
      if (Object.prototype.toString.call(rest[i]) === '[object Object]') {
        config = rest[i]
      }
    }
    const hooks = {
      abort : null,
    }
    const cancelToken = new CancelToken((c)=> { hookes.abort = c})
    // Si vous utilisez le 30 sur le service fictif, le cookie par défaut est aucun cookie sur le serveur
    if (option && (option.baseURL.indexOf('12602') !== -1)) {
      baseConfig.withCredentials = true
    } else {
      baseConfig.withCredentials = true
    }
    axios({
      ...baseConfig, ...options , ...config, url :api , data, cancelToken,
    })
    .then(response => response.data)
    .then((response) => {
      switch (response.status) {
        case 1 : {success && success(response); break }
        case 2 : {
            // message.warning(response.msg)
            // failure && failure(response)
            if (typeof failure === 'function') {
              failure(response)
            } else {
              // eslint-disable-next-line
              if (response.msg === '系统内部错误!') {
                message.error(response.msg)
              } else {
                message.warning(response.msg)
              }
            }
            break
          }
          case -1: {
            if (typeof failure === 'function') {
              failure(response)
            }
            message.warning(response.msg)
            hashHistory.replace('/login')
            break
          }
          default: {
            if (typeof failure === 'function') {
              failure(response)
            } else {
              message.warning('Les paramètres de retour du serveur ne sont pas reconnus')
            }
          }
      }
    })
    .catch((e) => {
      if (axios.isCancel(e)) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('Request canceled', e.message)
          }
        } else {
          console.dir(e)
          if (typeof failure === 'function') {
            if (e.code === 'ECONNABORTED') { // Erreur de dépassement de délai
              failure({
                data: '',
                msg: 'La connexion au serveur a expiré',
                status: 0,
              })
            } else {
              failure({
                data: '',
                msg: e.message,
                status: 0,
              })
            }
          }
    })
    return hooks
  }
}
// Créer un lanceur qui lance l'API
export const createApi = function (api, options) {
  const obj = parseQueryString(window.location.href)
  let url = api
  if (obj.key) {
    url = `${api}?key=${obj.key}`
    if (obj.sourceName) {
      url = `${api}?key=${obj.key}&sourceName=${obj.sourceName}`
    }
  }
  return oftenFetchByPost(`${url}`, options)
}
