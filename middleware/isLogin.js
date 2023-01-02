const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.body.token;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        res.status(200).json({ message: 'OK' })
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Oturum Süresi Dolmuştur',
                status: 401
            });
        }
        else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Yetkisiz erişim ',
                status: 401
            });
        }
    }
}