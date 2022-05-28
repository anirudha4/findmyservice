import admin from 'firebase-admin'
import serviceAccount from './serviceAccount.json'

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
} catch (error) {
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack)
    }
}
export const db = admin.firestore();
export const auth = admin.auth();

export default admin;