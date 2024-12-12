const admin = require("firebase-admin");

const firebaseApp = admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(require('../../ibs-app-api-firebase-adminsdk-ovkoi-7c11a144c2.json'))
});

const db = firebaseApp.firestore();

module.exports = { db };