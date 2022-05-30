import { auth, db } from "fire/admin";

export default async function handler(req, res) {
    try {
        const { token } = req.headers;
        const { uid } = await auth.verifyIdToken(token);
        const snapshot = await db.collection('users').doc(uid).get()
        if (!snapshot.exists) {
            return res.json(null)
        }
        const user = { ...snapshot.data(), uid: snapshot.id }
        res.json(user);
    } catch (err) {
        res.status(401).json(err);
    }
}