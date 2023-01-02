const mongoose = require('mongoose');
const Category = require('./category');
const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    imageUrl: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    tr: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    },
    en: {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    ru: {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    fr: {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    de: {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    ar: {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    variant: [
        { key: { type: String, required: false }, value: { type: String, required: false } }
    ]

}, { timestamps: true })

productSchema.methods.changeCategory = async function (newCategoryId) {
    //Eski Kategoriden Ürünü Siliyor
    const oldCategory = await Category.findById(this.categoryid);
    await oldCategory.removeProduct(this._id);

    //Yeni Kategoriye ürün ekliyor
    const newCategory = await Category.findById(newCategoryId);
    await newCategory.addProduct(this._id);
}


module.exports = mongoose.model('Product', productSchema);