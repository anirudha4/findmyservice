import { db } from "fire/admin";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { uid } = req.query;
            console.log(uid);
            const snapshot = await db.collection('users').doc(uid).get()
            if (!snapshot.exists) {
                return res.json(null)
            }
            const user = { ...snapshot.data(), uid: snapshot.id }
            res.json(user);
        }
    } catch (err) {
        console.log(err);
    }
}