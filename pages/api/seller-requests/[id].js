import { db } from "fire/admin";

export default async function handler(req, res) {
    try {
        if(req.method === 'GET') {
            const { id } = req.query;
            const snapshot = await db.collection('seller-request').doc(id).get();
            if(!snapshot.exists) {
                return res.status(200).json({
                    exists: false
                })
            }
            const data = { ...snapshot.data(), id: snapshot.id, status: true, exists: true }
            return res.status(200).json(data);
        }
    } catch(err) {
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
}