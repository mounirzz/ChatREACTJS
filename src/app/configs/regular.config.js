// Règles régulières communes
// eslint-disable-next-line
export const regExpConfig = {
  IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, // Carte d'identité
  mobile: /^1([3|4|5|7|8|])\d{9}$/, // Numéro de portable
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, // Téléphone fixe
  num: /^[0-9]*$/, // Nombre
  phoneNo: /(^1([3|4|5|7|8|])\d{9}$)|(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$)/, // Téléphone ou téléphone portable
  policeNo: /^[0-9A-Za-z]{4,10}$/, // Numéro de compte 4-10 chiffres ou lettres
  pwd: /^[0-9A-Za-z]{6,16}$/, // Le mot de passe est composé de 6 à 16 chiffres ou lettres
  isNumAlpha: /^[0-9A-Za-z]*$/, // Lettre ou chiffre
  isAlpha: /^[a-zA-Z]*$/, // Si les lettres
  isNumAlphaCn: /^[0-9a-zA-Z\u4E00-\uFA29]*$/, // Que ce soit des chiffres ou des lettres ou des caractères chinois
  isPostCode: /^[\d-]*$/i, // Si code postal
  isNumAlphaUline: /^[0-9a-zA-Z_]*$/, // Aucun chiffre, lettre ou soulignement
  isNumAndThanZero: /^([1-9]\d*(\.\d+)?|0)$/, // Est-ce un entier et est supérieur à 0 / ^ [1-9] \ d * (\. \ D +)? $ /
  isNormalEncode: /^(\w||[\u4e00-\u9fa5]){0,}$/, // Que ce soit un caractère non spécial (y compris le soulignement alphanumérique chinois)
  isTableName: /^[a-zA-Z][A-Za-z0-9#$_-]{0,29}$/, // Nom de la table
  isInt: /^-?\d+$/, // Entier
  isTableOtherName: /^[\u4e00-\u9fa5]{0,20}$/, // Aias
  // isText_30: /^(\W|\w{1,2}){0,15}$/, // Régulière
  // isText_20: /^(\W|\w{1,2}){0,10}$/, // Régulière
  isText_30: /^(\W|\w{1}){0,30}$/, // Faites correspondre 30 caractères, les caractères peuvent former des lettres, des chiffres, des traits de soulignement, des caractères non-lettres, un caractère chinois compte pour 1 caractère.
  isText_50: /^(\W|\w{1}){0,50}$/, // Faites correspondre 50 caractères, les caractères peuvent former des lettres, des chiffres, des traits de soulignement, des caractères non-lettres, un caractère chinois compte pour 1 caractère.
  isText_20: /^(\W|\w{1}){0,20}$/, // Faites correspondre 20 caractères, les caractères peuvent former des lettres, des chiffres, des traits de soulignement, des caractères non-lettres, un caractère chinois compte pour 1 caractère.
  isText_100: /^(\W|\w{1}){0,100}$/, // Correspond à 100 caractères, les caractères peuvent former des lettres, des chiffres, des traits de soulignement, des caractères autres que des lettres, un caractère chinois compte pour 1 caractère
  isText_250: /^(\W|\w{1}){0,250}$/, // Correspond à 250 caractères, les caractères peuvent former des lettres, des chiffres, des traits de soulignement, des caractères autres que des lettres, un caractère chinois compte pour 1 caractère
  isNotChina: /^[^\u4e00-\u9fa5]{0,}$/, // pas chinois  IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, // carte d'identité
  IDcardAndAdmin: /^(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(admin))$/, // Carte d'identité ou compte d'administrateur
  IDcardTrim: /^\s*(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(admin))\s*$/, // carte d'identité
  num1: /^[1-9]*$/, // Nombre
  companyNO: /^qqb_[0-9a-zA-Z_]{1,}$/, // Compte personnel de l'entreprise
  imgType: /image\/(png|jpg|jpeg|gif)$/, // Télécharger le type d'image
  isChina: /^[\u4e00-\u9fa5]{2,8}$/,
  isNozeroNumber: /^\+?[1-9]\d*$/, // un entier positif supérieur à zéro
  float: /^\d+(\.?|(\.\d+)?)$/, // Correspond à un entier positif, un nombre décimal ou 0. Cette valeur spéciale
}
