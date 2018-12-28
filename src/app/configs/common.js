import { hashHistory } from 'react-router'
import { message } from 'antd'
import { loginByTicket, staff, nav, login as loginApi, getBtns } from '@apis/common'

export function parseQueryString(ur){
  const obj = {}
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1]
    const strs = str.split('&')
    strs.map((item, i) => {
      /* eslint-disable */
      obj[arr[0]] = arr[1]
    })
  }
  return obj
}

const _fetchLoginByTicket = async ticket => new Promise ((resolve) => {
  loginByTicket({ ticket }, (reponse) => {
    resolve(reponse.data)
  }, (response) => {
    const obj = parseQueryString(window.location.href)
    console.log(obj)
    if (obj.ticket || obj.mode) {
      message.info('Login expiré ou service indisponible')
    } else {
      hashHistory.replace('/login')
    }
  })
})

const -fetchStaff = () => new Promise((resolve) => {
  staff({}, (res) => {
    const { data } = res
    sessionStorage.setItem('userInfo', JSON.stringify(data))
    resolve()
  })
})

/* eslint-disable no-use-before-define */
export const isHashCurrentMenu = (allMenu, pathname)=> compare(allMenu, pathname)
/* eslint-enable no-use-before-define */

const _fetchNav = pathname => new Promise ((resolve) => {
  // try {
    //   if (JSON.parse(sessionStorage.getItem('menu')).length > 0) {
    //     resolve()
    //     return
    //   }
    // } catch (e) { e }
    nav({}, (reponse)=> {
      const { list } = reponse.Data
      if(list.lenght === 0){
        message.info("Le compte ne dispose d'aucune autorisation de menu. Veuillez contacter l'administrateur.")
        hashHistory.replace('/login')
        // this.setState({ loading: false })
        return
      }
      sessionStorage.setItem('menu', JSON.stringify(list))
      // TODO: Après avoir ajouté les autorisations du menu, vous devez ajouter le code suivant.
    // if (pathname !== '/' && !isHasCurrentMenu(list, pathname)) {
    //   if (process.env.NODE_ENV === 'production') {
    //     hashHistory.replace('/')
    //   }
    // }
    resolve()
    })
})
/* Appels du composant de niveau supérieur, que le paramètre de ticket soit inclus ou non */
export const validateTickit = async function validateTickit({ query, pathname }, callback){
  const { ticket } = query
  if(ticket) {
    const loginInfo = await _fetchLoginByTicket(ticket)
    sessionStorage.setItem('token', loginInfo.token)
    // sessionStorage.setItem('isLeftNavMini', faLse)
  }else {
    // Il n'existe que dans les deux situations suivantes:
    /* 1. Si vous n'êtes pas connecté, déconnectez-vous à la page de connexion pour vous connecter. Lorsque vous vous connectez, vous pouvez obtenir le menu et l'enregistrer dans sessionStorage. Vous pouvez ensuite accéder à la page. Il vous suffit de demander les informations relatives au personnel lors de l'exécution de ce code.
    * 2. Connectez-vous, exécutez ce code après l'actualisation de la page, pensez que le menu a été acquis depuis la dernière connexion et qu'il a été enregistré dans sessionStorage. Il vous suffit donc de demander des informations sur le personnel.
    * (FIXME: dans le cas d'une vitesse de réseau lente, il peut arriver que le jeton de connexion soit obtenu et que les données de menu soient directement renvoyées avant que les données de menu ne soient renvoyées, de sorte que le menu ne peut pas être obtenu)
    // await _fetchStaff()
        // if (typeof callback === 'function')callback()
        /*
        _fetchStaff()
        _fetchNav(callback)
      */
  }

  const _a = _fetchStaff()
  const _b = _fetchNav(pathname)
  await _a
  await _b
  if (typeof call === 'function') callback()
}

/* -------------- Stocke l'ID de menu de la page en cours sur l'attribut menuId de sessionStorage -------------- */
// Méthode de comparaison
function compare(children, pathname){
  for (let i = 0; i < children.length; i+= 1) {
    const item = children[i]
    /* eslint-disable no-useless-escape */
    const _resKey = `${item.resKey.replace(/[\$\.\?\+\^\[\]\(\)\{\}\|\\\/]/g, '\\$&').replace(/\*\*/g, '[\\w|\\W]+').replace(/\*/g, '[^\\/]+')}$`
    /*eslint-disable no- */
    if (new RegExp(_resKey).test(pathname)) {
      sessionStorage.setItem('menuId', item.id)
      return true
    }else if (item.children) {
      if (compare(item.children, pathname)) return true

    }
  }
  return false
}

// Obtenir l'identifiant du menu

export const getMenuId = (navs, pathname) => {
  if (navs && navs.length > 0) {
    compare(navs, pathname)
  }
}
/* -----------------------------------------------------------------------------*/

/* ------------------------- Atterrissage -------------------------*/
export const login = (params, success, failure) => {
  loginApi(params, (response) => {
    sessionStorage.setItem('token', response.data.token)
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
    // _fetchNav().then(() => { success() })
    if (typeof success === 'function') success(response)
  }, (response) => {
    if (typeof failure === 'function') failure(response)
  })
}
/* -------------------------------------------------------*/

// Button Obtenir
export const fetchBtns = (component, cb) => {
  getBtns({ id: sessionStorage.getItem('menuId') }, (res) => {
    const result = {}
    res.data.list.map((item) => {
      result[item.resKey] = true
    })
    typeof (cb) === 'function' ? cb(result) : ''
  })
}

// Jugement de l'entrée de la route
export const isLogin = (nextState, replaceState) => {
  if (nextState.location.query && nextState.location.query.ticket) { // Si l'URL est livré avec un ticket
    sessionStorage.setItem('token', 'ticket')
  }
  if (nextState.location.query && nextState.location.query.key) { // Si l'URL est livré avec une clé
    sessionStorage.setItem('token', 'key')
  }
  const token = sessionStorage.getItem('token')
  if (!token) { // Pas de jeton, puis retournez à la page d'accueil
    replaceState('/login')
  }
}


// La demande d'étape doit marcher de manière redux
export const createAjaxAction = (createdApi, startAction, endAction) => (request = {}, resolve, reject, config) => (dispatch) => {
  if (startAction) dispatch(startAction({ req: request, res: {} }))
  const _resolve = (response) => {
    if (endAction) dispatch(endAction({ req: request, res: response }))
    if (resolve) resolve(response)
  }
  return createdApi(request, _resolve, reject, config)
}
