import { createApi } from '@ajax'
import { mockURL, path } from '@config'

const prefix = 'usercenter'
const option = { baseURL: mockURL }

export const login = createApi(`${path}/${prefix}/login`, option) // authentification
export const logout = createApi(`${path}/${prefix}/logout`, option) // Déconnexion
export const loginByTicket = createApi(`${path}/${prefix}/loginByTicket`, option) // Se connecter via le ticket
export const loginByKey = createApi(`${path}/service/pagerservice/checkKey`, option) // Entrez le projet par clé
export const staff = createApi(`${path}/${prefix}/user/userInfo`, option) // Informations utilisateur
export const synUser = createApi(`${path}/${prefix}/user/synUser`, option)// Synchroniser les utilisateurs
export const menu = createApi(`${path}/${prefix}/user/userMenu`, option) // Obtenir le menu
export const getLevel = createApi(`${path}/${prefix}/user/getLevel`, option) // Niveau d'utilisateur actuel
export const getBtns = createApi(`${path}/${prefix}/resource/listByPid`, option) // Obtenir l'identifiant du menu
export const getAllRetrieval = createApi(`${path}/data/sys/retrieval/queryAllRetrievald`) // Obtenir une recherche dans l'en-tête Form2.0
