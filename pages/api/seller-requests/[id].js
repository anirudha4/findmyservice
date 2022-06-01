import { auth, db } from "fire/admin";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { id } = req.query;
            const snapshot = await db.collection('seller-request').doc(id).get();
            if (!snapshot.exists) {
                return res.status(200).json({
                    exists: false
                })
            }
            const data = { ...snapshot.data(), id: snapshot.id, status: true, exists: true }
            return res.status(200).json(data);
        }
        else if (req.method === 'POST') {
            const { status, message, subject, ...restBody } = req.body;
            const { id } = req.query;
            const request = await db.collection('seller-request').doc(id).get();
            if (!request.exists) {
                throw new Error('No Seller Request Found')
            }
            await db.collection('seller-request').doc(id).set({
                status,
                message,
                subject,
                approved: status
            }, { merge: true })
            const { email, lastName, firstName, city, state, zip, gstin, phone } = request.data();
                await auth.updateUser(request.data().uid, {
                displayName: `${firstName} ${lastName}`,
                email,
            });
            await db.collection('users').doc(request.data().uid).set({
                email,
                firstName,
                lastName,
                city,
                state,
                zip,
                gstin,
                phone,
                isSeller: true
            }, { merge: true })
            return res.json({
                message: 'Seller Request Approved',
                status: true
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
}