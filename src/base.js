import Rebase from 're-base'
/*Au lieu d'importer la librairie Firebase complète, j'importe uniquement les sous-librairies dont j'ai besoin
pour optimiser l'appel de la librairie pour que ça soit plus rapide et léger.*/
import firebase from 'firebase/app'
import 'firebase/database'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDCiX9_kFYoatKJB7Idc-K_k2XrkwUs5So",
    authDomain: "gourmeto-6fd67.firebaseapp.com",
    databaseURL: "https://gourmeto-6fd67.firebaseio.com"
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }
export default base
