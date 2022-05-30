import { db } from "fire/admin"
import { initializeEmailService, sendVerificationEmail } from "utils/mail";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const user = req.body.user;
            const response = await db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                photoURL: null,
                isSeller: false,
            });
            const OAuthClient = initializeEmailService();
            const accessToken = await OAuthClient.getAccessToken();
            const isRefreshTokenValid = await OAuthClient.verifyIdToken(process.env.REFRESH_TOKEN);
            await sendVerificationEmail(accessToken, { to: 'anirudhag13@gmail.com', subject: 'Verify your email', text: 'This is test email' });
            return res.status(200).json({
                data: response
            })
        } else if (req.method === 'GET') {
            const { uid } = req.query;
            const snapshot = await db.collection('users').doc(uid).get()
            const user = { ...snapshot.data(), uid: snapshot.id }
            return res.json(user);
        }
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }

}