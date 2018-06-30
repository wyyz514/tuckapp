import Rebase from 're-base'
import firebase from 'firebase'
import credentials from './config';

const config = {
  apiKey: credentials.REACT_APP_FIREBASE_KEY,
  authDomain: credentials.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: credentials.REACT_APP_FIREBASE_DATABASE,
  projectId: credentials.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: credentials.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: credentials.REACT_APP_FIREBASE_SENDER_ID
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const storage = app.storage().ref("Images");

export { base, storage }