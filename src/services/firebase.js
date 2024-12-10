const admin = require("firebase-admin");

const firebaseApp = admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(require('../../ibs-app-api-firebase-adminsdk-ovkoi-34c05a7b9a.json'))
});

const db = firebaseApp.firestore();

module.exports = { db };