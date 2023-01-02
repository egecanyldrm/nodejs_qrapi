const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    imageUrl: {
        type: String,
        required: true
    },
    tr: {
        name: {
            type: String,
            required: true
        }
    },
    en: {
        name: {
            type: String,
            required: false
        }
    },
    ru: {
        name: {
            type: String,
            required: false
        }
    },
    fr: {
        name: {
            type: String,
            required: false
        }
    },
    de: {
        name: {
            type: String,
            required: false
        }
    },
    ar: {
        name: {
            type: String,
            required: false
        }
    },
    rootcategory: String,
    categoryProducts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    ]

}, { timestamps: true })

categorySchema.methods.addProduct = function (productid) {
    const products = this.categoryProducts;
    products.push(productid);
    this.categoryProducts = [
        ...products
    ]
    return this.save();
}
categorySchema.methods.removeProduct = function (productid) {
    const newCategoryProducts = this.categoryProducts.filter(product => product.toString() !== productid.toString());
    this.categoryProducts = newCategoryProducts;
    return this.save();
}


module.exports = mongoose.model('Category', categorySchema);