const User = require("../model/user")

module.exports = async (req, res, next) => {
    const { customerName } = req.params;

    try {
        const customer = await User.findOne({ username: customerName }).select(' _id ');
        req.user = customer._id
        next()
    } catch (error) {
        res.status(404).json({ message: 'Müşteri Bulunamadı ' });
    }
}