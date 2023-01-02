const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken.userId;
        next()
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