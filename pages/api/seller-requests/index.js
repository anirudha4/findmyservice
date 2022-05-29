import { db, storage } from 'fire/admin';
import { IncomingForm } from 'formidable'

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const form = new IncomingForm()
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    throw new Error(err)
                }
                const { uid } = fields;
                const document = await storage.upload(files.documentPhoto.filepath, {
                    destination: `users/${uid}/documentPhoto.jpg`,
                    public: true
                });
                const store = await storage.upload(files.storePhoto.filepath, {
                    destination: `users/${uid}/storePhoto.jpg`,
                    public: true
                });
                const documentPhoto = { downloadURL: document[0].metadata.mediaLink, name: document[0].name };
                const storePhoto = { downloadURL: store[0].metadata.mediaLink, name: store[0].name };
                const payload = {
                    ...fields,
                    documentPhoto,
                    storePhoto,
                    status: false
                }
                await db.collection('seller-request').doc(uid).set(payload);
                return res.status(201).json({
                    status: true,
                    data: payload
                })
            });
        } else if (req.method === 'GET') {
            const { uid, pending } = req.query;
            if (pending) {
                const snapshot = await db.collection('seller-request').where("status", "==", false).get();
                let requests = [];
                snapshot.forEach(doc => requests.push({ ...doc.data(), id: doc.id }))
                return res.status(200).json(requests)
            }
            const snapshot = await db.collection('seller-request').doc(uid).get();
            if (!snapshot.exists) {
                return res.status(200).json({
                    exists: false
                })
            }
            const data = { ...snapshot.data(), id: snapshot.id, status: true, exists: true }
            res.status(200).json(data);
        } else if (req.method === 'DELETE') {
            const { uid } = req.query;
            await db.collection('seller-request').doc(uid).delete();
            return res.status(200).json({
                status: true,
                message: 'Request deleted'
            })
        }
    } catch (err) {
        res.status(400).json({
            status: false,
            err
        })
    }
}
