import { db } from "fire/admin"

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const user = req.body.user;
            const response = await db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                photoURL: null,
                isSeller: false,
            })
            res.json({
                data: response
            })
        } else if (req.method === 'GET') {
            const { uid } = req.query;
            const snapshot = await db.collection('users').doc(uid).get()
            const user = { ...snapshot.data(), uid: snapshot.id }
            res.json(user);
        }
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }

}