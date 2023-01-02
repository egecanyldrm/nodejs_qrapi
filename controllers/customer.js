
const User = require('../model/user')
const Category = require('../model/category');

exports.customerHomePage = async (req, res) => {

    try {
        const customer = await User.findById(req.user).select(' theme companyName contact userLogo -_id themeSettings package ');
        const categories = await Category.find({ userId: req.user }).populate('categoryProducts', '_id tr en ru fr de ar variant price imageUrl ').select(' -createdAt -updatedAt -userId  -__v')

        if (customer.userLogo) customer.userLogo = process.env.API_URL + customer.userLogo;
        
        categories.map(category => {
            category.imageUrl = process.env.API_URL + category.imageUrl;
            if (category.categoryProducts) {
                category.categoryProducts.map(product => {
                    if (product.imageUrl) product.imageUrl = process.env.API_URL + product.imageUrl
                    else product.imageUrl = false
                })
            }
        })
        res.status(200).json({ user: customer, categories: categories })
    } catch (error) {
        res.status(404).json({ message: 'Müşteri Bulunamadı ' });
    }

}