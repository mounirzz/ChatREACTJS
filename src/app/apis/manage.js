import { createApi } from '@ajax'
import { mockURL, path } from '@config'

const prefix = 'usercenter'
const option = { baseURL : mockURL }

// Gestion de module
export const fetchModuleList = createApi(`${path}/${prefix}/resource/list`, option) // Obtenir la liste des modules
export const fetchModuleDelete = createApi(`${path}/${prefix}/resource/delete`, option) // Supprimer le module
export const fetchModuleDetail = createApi(`${path}/${prefix}/resource/detail`, option) // Obtenir les détails du module
export const fetchChangeModuleStatus = createApi(`${path}/${prefix}/resource/updateStatus`, option) // Modifier l'état explicite du module
export const fetchModuleUpdateDetail = createApi(`${path}/${prefix}/resource/update`, option) // Modifier les détails du module
export const fetchModuleAdd = createApi(`${path}/${prefix}/resource/save`, option) // Nouveau module
export const fetchButtonList = createApi(`${path}/${prefix}/resource/button/list`, option) // Bouton liste de permission

// Gestion des rôles
export const fetchRoleList = createApi(`${path}/${prefix}/role/list`, option) // Liste de rôle
export const fetchRoleAdd = createApi(`${path}/${prefix}/role/save`, option) // Enregistrer le rôle
export const fetchRoleUpdate = createApi(`${path}/${prefix}/role/update`, option) // Édition de rôle
export const fetchRoleDetail = createApi(`${path}/${prefix}/role/detail`, option) // Menus et boutons sélectionnés
export const fetchRoleDelete = createApi(`${path}/${prefix}/role/delete`, option) // Supprimer le rôle
export const fetchModuleListInRole = createApi(`${path}/${prefix}/role/resList`, option) // Module sélectionné
export const fetchUpdateRoleRes = createApi(`${path}/${prefix}/role/updateRes`, option) // Mettre à jour les modules sélectionnés

export const fetchRoleDeletePeople = createApi(`${path}/${prefix}/user/removeRole`, option)
export const fetchUpdateButton = createApi(`${path}/${prefix}/role/updateButton`, option)
export const fetchTreeList = createApi(`${path}/${prefix}/role/resTree`, option)
// Gestion des utilisateurs
export const fetchUserDepttList = createApi(`${path}/${prefix}/dept/list`, option) // Obtenir la liste des catégories de gauche de la gestion des utilisateurs
export const fetchUserList = createApi(`${path}/${prefix}/user/list`, option) // Obtenir la liste des utilisateurs
export const fetchUserDetail = createApi(`${path}/${prefix}/user/detail`, option) // Obtenir les détails de l'utilisateur
export const fetchUserDetailUpdate = createApi(`${path}/${prefix}/user/update`, option) // Modifier les détails de l'utilisateur
export const fetchUserAdd = createApi(`${path}/${prefix}/user/save`, option) // Ajouter un utilisateur
export const synUser = createApi(`${path}/${prefix}/user/synUser`, option) // Synchroniser les utilisateurs
export const fetchUserSetRole = createApi(`${path}/${prefix}/user/updateRole`, option) // Modifier le rôle de l'utilisateur
export const fetchUserDelete = createApi(`${path}/${prefix}/user/delete`, option) // Supprimer l'utilisateur
export const fetchChangeUserStatus = createApi(`${path}/${prefix}/user/updateStatus`, option) // Définir si l'utilisateur est gelé
