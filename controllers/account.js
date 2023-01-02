const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailTemplate = require('../assets/mailTemplate')
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)



exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ 'contact.email': email })
        if (!user) {
            return res.status(404).json({
                message: 'Kullanıcı Bulunamadı',

            })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                message: 'Kullanıcı adı veya şifre yanlış',
            })
        }
        const { username, name, role, _id, package } = user;

        const userLanguage = package === 'deluxe' ? true : false;

        const token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY, { expiresIn: '2 days' });

        res.status(200).json(
            {
                token: token,
                user: {
                    username: username,
                    name: name,
                    role: role.isCustomer,
                    package: package,
                    language: userLanguage
                }
            });
    } catch (error) {
        res.status(404).json({
            message: 'Kullanıcı Bulunamadı',
        })
    }
}



exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const buf = crypto.randomBytes(32);
    const token = buf.toString('hex');
    try {
        const user = await User.findOneAndUpdate({ 'contact.email': email }, { resetToken: token, resetTokenExpiration: Date.now() + 3600000 }); // 1 saatlik bir süre eklendi
        if (!user) {
            return res.status(404).json({ title: 'Kullanıcı Bulunamadı', message: 'Girmiş olduğunuz email adresi bulunamadı.' })
        }
        const msg = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: 'Parola Sıfırlama',
            html: emailTemplate.mailTemplate((process.env.FRONT_END_URL + '/reset-password/' + token), user.name),
        }

        await sgMail.send(msg).catch((error) => { throw error })
        res.status(200).json({ message: 'Kayıt başarılı bir şekilde yapıldı' });

    } catch (error) {
        if (error.response) {
            res.status(404).json({ message: 'Mail Gönderilemedi' });
            console.error(error.response.body)
        }
    }
}

exports.resetPassword = async (req, res) => {
    const { newPassword, token } = req.body;
    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        if (!user) throw new Error('Token Süresi Dolmuştur', { cause: 401 });
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.resetPassword(hashedPassword);
        res.status(200).json({ message: 'Şifre Başarılı Bir şekilde Değiştirildi' });
    } catch (error) {
        if (error.cause === 401) res.status(401).json({ title: 'Talep Süresi Dolmuştur', message: 'Şifre sıfırlama talebinizin süresi dolmuştur .' });
        if (error.response) {
            res.status(404).json({ message: 'Mail Gönderilemedi' });
            console.error(error.response.body)
        }
    }
}