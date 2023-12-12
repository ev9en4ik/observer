// Import the functions you need from the SDKs you need
const firebase = require('firebase/app')
const config = require('config')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: config.get('firebaseApiKey'),
    authDomain: config.get('firebaseAuthDomain'),
    projectId: config.get('firebaseProjectId'),
    storageBucket: config.get('firebaseStorageBucket'),
    messagingSenderId: config.get('firebaseMessagingSenderId'),
    appId: config.get('firebaseAppId'),
    measurementId: config.get('firebaseMeasurementId'),
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
module.exports = app
