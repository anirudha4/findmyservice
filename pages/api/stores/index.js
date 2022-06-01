import { db } from "fire/admin";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { uid } = req.query;
            const data = await db.collection('stores').where('uid', '==', uid).get();
            let stores = [];
            data.forEach(store => {
                stores.push({ ...store.data(), id: store.id });
            })
            return res.json(stores.length ? stores[0] : {})
        }
        res.status(200).json(store);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}