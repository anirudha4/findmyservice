const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// setup oAuth2Client
// const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLEINT_SECRET,
//     REDIRECT_URI
// );

export const initializeEmailService = () => {
    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLEINT_SECRET,
        REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    return oAuth2Client;
}
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// send email on registration
exports.sendVerificationEmail = async (accessToken, restMailOptions) => {

    // const accessToken = await oAuth2Client.getAccessToken();
    // create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'anirudhag1999@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLEINT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken
        },
    });
    const mailOptions = {
        from: 'findmyservice <anirudhag1999@gmail.com>',
        ...restMailOptions
    }
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error.message);
    }
};