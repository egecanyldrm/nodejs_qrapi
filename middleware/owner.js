const User = require('../model/user')
module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user, 'role.isCustomer': false })
        if (!user) {
            return res.status(401).json({
                message: 'Yetkisiz erişim ',
                status: 401
            });
        } else {
            next()
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Yetkisiz erişim ',
            status: 401
        });
    }
}