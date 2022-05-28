import admin from 'firebase-admin'
import { getStorage } from 'firebase-admin/storage';
import serviceAccount from './serviceAccount.json'

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'gs://findmyservice-d4f78.appspot.com'
    })
} catch (error) {
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack)
    }
}
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = getStorage().bucket();

export default admin;