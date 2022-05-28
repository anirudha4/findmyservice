import { db, storage } from 'fire/admin';
import { IncomingForm } from 'formidable'

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'POST':
                const form = new IncomingForm()
                form.parse(req, async (err, fields, files) => {
                    if(err) {
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
                        storePhoto
                    }
                    await db.collection('seller-request').add(payload);
                    return res.status(201).json({
                        status: true,
                        data: payload
                    })
                });
                break;
            case 'GET':
                const snapshot = await db.collection('seller-request').get();
                const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                console.log(data);
                res.status(200).json(data);
                break;
            default:
                console.log("default");
        }
    } catch (err) {
        res.status(400).json({
            status: false
        })
    }
}
