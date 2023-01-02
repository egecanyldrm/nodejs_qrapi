const Category = require('../model/category');
const Product = require('../model/product');
const User = require('../model/user');
const qs = require('qs');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path')
const translate = require('@vitalets/google-translate-api');

const handleRemoveFile = (file_path) => {
    return fs.access(path.join('..', file_path), fs.constants.F_OK, (err) => {
        //Dosya yoksa null değer dönüyor 
        if (!err) {
            //Eğer Dosya varsa 
            fs.unlink(path.join('..', file_path), (err) => {
                if (err) { console.log('Dosya silinemedi ') }
            })
        }
    });;
}

exports.categoryTranslate = async (req, res, next) => {
    const { categoryName } = req.body;
    try {
        const en = await translate(categoryName, { from: 'tr', to: 'en' });
        const ru = await translate(categoryName, { from: 'tr', to: 'ru' });
        const de = await translate(categoryName, { from: 'tr', to: 'de' });
        const ar = await translate(categoryName, { from: 'tr', to: 'ar' });
        const fr = await translate(categoryName, { from: 'tr', to: 'fr' });
        res.status(200).send({
            category: {
                tr: {
                    name: categoryName
                },
                en: {
                    name: en.text
                },
                ru: {
                    name: ru.text
                },
                fr: {
                    name: fr.text
                },
                ar: {
                    name: ar.text
                },
                de: {
                    name: de.text
                }
            }
        })
    } catch (error) {
        res.status(404).json({ message: 'Çeviri tamamlanamadı' });
    }
}

exports.productTranslate = async (req, res, next) => {
    const { productName, productDescription } = req.body;

    let enName, ruName, deName, arName, frName;
    let enDescription, ruDescription, deDescription, arDescription, frDescription = {};
    try {
        enName = await translate(productName, { from: 'tr', to: 'en' });
        ruName = await translate(productName, { from: 'tr', to: 'ru' });
        deName = await translate(productName, { from: 'tr', to: 'de' });
        arName = await translate(productName, { from: 'tr', to: 'ar' });
        frName = await translate(productName, { from: 'tr', to: 'fr' });
        if (productDescription && productDescription.length > 1) {
            enDescription = await translate(productDescription, { from: 'tr', to: 'en' });
            ruDescription = await translate(productDescription, { from: 'tr', to: 'ru' });
            deDescription = await translate(productDescription, { from: 'tr', to: 'de' });
            arDescription = await translate(productDescription, { from: 'tr', to: 'ar' });
            frDescription = await translate(productDescription, { from: 'tr', to: 'fr' });
        }

        res.status(200).send({
            tr: {
                name: productName,
                description: productDescription
            },
            en: {
                name: enName.text,
                description: productDescription ? enDescription.text : ' '
            },
            ru: {
                name: ruName.text,
                description: productDescription ? ruDescription.text : ' '
            },
            fr: {
                name: frName.text,
                description: productDescription ? frDescription.text : ' '
            },
            ar: {
                name: arName.text,
                description: productDescription ? arDescription.text : ' '
            },
            de: {
                name: deName.text,
                description: productDescription ? deDescription.text : ' '
            }
        })
    } catch (error) {
        res.status(404).json({ message: 'Çeviri tamamlanamadı' });
    }
}


exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ userId: req.user }).select('tr.name tr.description _id');
        res.status(200).send(categories)
    } catch (err) {
        res.status(404).json({ message: 'Kategori Bulunamadı' });
    }
}

exports.addCategory = async (req, res, next) => {
    const body = (qs.parse(req.body.category))
    const destination = req.file.path.substring(2)
    const newCategory = new Category({
        userId: req.user,
        imageUrl: destination,
        ...body
    });
    try {
        await newCategory.save()
        res.status(201).json({ message: 'Kategori Başarıyla Kayıt Edildi' })
    } catch (e) {
        if (req.file) handleRemoveFile(req.file.path)
        res.status(501).json({ message: 'Kategori Eklenemedi' });
    }

}
exports.deleteCategory = async (req, res, next) => {

    const { categoryId } = req.body;

    try {
        const category = await Category.findByIdAndDelete(categoryId);
        await Category.updateMany({ rootcategory: categoryId }, { rootcategory: '' })
        handleRemoveFile(category.imageUrl)
        res.status(200).json({ message: 'Kategori Başarıyla Silindi' })
    } catch (error) {
        res.status(501).json({ message: 'Kategori Silinemedi' });
    }

}


exports.getCategory = async (req, res, next) => {
    const { categoryId } = req.body;
    try {
        const category = await Category.findById(categoryId).select('tr ru en fr ar de _id  imageUrl');
        res.status(200).json({ category })
    } catch (error) {
        res.status(404).json({ message: 'Kategori Bulunamadı' });
    }
}


exports.editCategory = async (req, res, next) => {

    const categoryid = req.params.categoryid;
    const body = (qs.parse(req.body.category))
    const json = req.file ? { ...body, imageUrl: req.file.path.substring(2) } : body;

    let oldImageURL;
    try {
        const oldCategory = await Category.findById(req.params.categoryid);
        oldImageURL = oldCategory.imageUrl
        await Category.findByIdAndUpdate(categoryid, json);

        if (req.file) handleRemoveFile(oldImageURL)
        res.status(200).json({ message: 'Kategori Başarıyla Kayıt Edildi' })

    } catch (error) {
        if (req.file) {
            fs.access(req.file.path, fs.constants.F_OK, (err) => {
                //Dosya yoksa null değer dönüyor 
                if (!err) {
                    //Eğer Dosya varsa 
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.log('Dosya silinemedi ')
                        }
                    })
                }
            });
        }
        res.status(501).json({ message: 'Kategori Eklenemedi' });
    }
}


//Products Process

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ userId: req.user }).select('tr.name tr.description _id');
        res.status(200).send(products)
    } catch (err) {
        res.status(404).json({ message: 'Ürün Bulunamadı' });
    }
}

exports.getProduct = async (req, res, next) => {
    const { productId } = req.body;
    try {
        const product = await Product.findById(productId).select('tr ru en de fr ar _id price variant.key variant.value imageUrl  ');
        // product.imageUrl = process.env.API_URL + product.imageUrl
        const productCategory = await Category.findOne({ categoryProducts: { $in: product._id } }).select('tr _id');
        const allCategories = await Category.find({ userId: req.user });
        res.status(200).json({ product, productCategory, categories: allCategories })
    } catch (error) {
        res.status(501).json({ message: 'Ürün Bulunamadı' });
    }
}

exports.removeProductImage = async (req, res, next) => {
    const { imageId, productId } = req.body;
    try {
        const product = await Product.findById(productId)
        product.imageUrl = undefined;
        await product.save()
        handleRemoveFile(imageId);

        res.status(200)
    } catch (error) {
        res.status(501).json({ message: 'Silinemedi' });
    }
}


exports.addProduct = async (req, res, next) => {
    const { categoryid, ...others } = (qs.parse(req.body.product))

    if (req.file) others.imageUrl = req.file.path.substring(2)

    const newProduct = new Product({
        userId: req.user,
        ...others
    });
    try {
        const result = await newProduct.save()
        if (categoryid) { // Eğer Kategori varsa ürünler dizisine eklenicek
            const category = await Category.findById(categoryid);
            await category.addProduct(result._id)
        }
        res.status(201).json({ message: 'Ürün Başarıyla Kayıt Edildi' })

    } catch (e) {
        if (req.file) {
            fs.access(req.file.path, fs.constants.F_OK, (err) => {
                // Dosya yoksa null değer dönüyor
                if (!err) {
                    // Eğer Dosya varsa
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.log('Dosya silinemedi ')
                        }
                    })
                }
            });
        }
        res.status(501).json({ message: 'Ürün Eklenemedi' });
    }

}

exports.editProduct = async (req, res, next) => {

    const productid = req.params.productid;
    let body = JSON.parse(req.body.product)

    // there is an image check path 
    if (req.file) body.imageUrl = req.file.path.substring(2)

    try {
        const product = await Product.findById(productid);

        //Resim (file) var ise eski resim silinir
        if (req.file) handleRemoveFile(product.imageUrl)



        // Ürünün ait olduğu kategoriden çıkartıyoruz
        const prevCategory = await Category.findOne({ categoryProducts: { $in: productid } });
        if (prevCategory) await prevCategory.removeProduct(productid);

        // Yeni Kategoriyi bulup kategoriye ait ürün dizisine ekliyoruz
        const newCategory = await Category.findById(body.categoryid);
        await newCategory.addProduct(productid);


        //Ürün Güncellenir
        await product.updateOne(body);

        res.status(200).json({ message: 'Ürün Başarıyla Kayıt Edildi' })
    } catch (error) {
        if (req.file) {
            fs.access(req.file.path, fs.constants.F_OK, (err) => {
                //Dosya yoksa null değer dönüyor 
                if (!err) {
                    //Eğer Dosya varsa 
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.log('Dosya silinemedi ')
                        }
                    })
                }
            });
        }
        res.status(501).send({ message: 'Ürün Kayıt Edilemedi' });
    }
}


exports.deleteProduct = async (req, res, next) => {
    const { productId } = req.body;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (product.imageUrl) {  //Ürünün resmi varsa siliniyor
            handleRemoveFile(product.imageUrl)
        }
        //Ürüne sahip olan kategori varsa bulup siliyor 
        const category = await Category.findOne({ categoryProducts: { $in: productId } });
        if (category) await category.removeProduct(productId);
        res.status(200).json({ message: 'Ürün Başarıyla Silindi' })
    } catch (error) {
        res.status(501).json({ message: 'Ürün Silinemedi' });
    }
}


// Business Process 

exports.getBusinessDetail = async (req, res, next) => {

    try {
        const userDetail = await User.findById(req.user).select('-password -role -updateAt ');
        userDetail.qrcode = process.env.API_URL + userDetail.qrcode
        if (userDetail.userLogo) userDetail.userLogo = process.env.API_URL + userDetail.userLogo
        res.status(200).json({ userDetail: { ...userDetail._doc } })
    } catch (error) {
        res.status(404).json({ message: 'Kullanıcı Detayları Bulunamadı' });
    }

}
exports.removeLogo = async (req, res, next) => {

    try {
        const userDetail = await User.findById(req.user);
        userDetail.logo = undefined;
        await userDetail.save()
        if (userDetail.userLogo) handleRemoveFile(userDetail.userLogo)
        res.status(200).json({ message: 'Logo Silindi.' });;
    } catch (error) {
        res.status(404).json({ message: 'Kullanıcı Detayları Bulunamadı' });
    }

}

exports.updateBusinessDetail = async (req, res) => {

    const userId = req.user;
    const body = (qs.parse(req.body.business_detail))
    // Eğer resim gelmiş ise jsona imageUrl de eklenip güncelleniyor
    const json = req.file ? { ...body, userLogo: req.file.path.substring(2) } : body;
    let prevLogo;
    try {
        const prevUser = await User.findById(userId);
        if (prevUser.userLogo) prevLogo = prevUser.userLogo
        await prevUser.updateOne(json)
        //Resim (file) var ise eski resim silinir
        if (req.file && prevLogo) handleRemoveFile(prevUser.userLogo)
        res.status(200).json({ message: 'Ürün Başarıyla Kayıt Edildi' })

    } catch (error) {
        res.status(501).json({ message: 'Ürün Eklenemedi' });
    }
}

exports.changePassword = async (req, res) => {

    const userId = req.user;
    const { currentPassword, newPassword } = req.body;

    try {
        const userDetail = await User.findById(userId).select('password');
        const match = await bcrypt.compare(currentPassword, userDetail.password);

        if (match) { // Eğer şifreler eşitse
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await userDetail.updateOne({ password: hashedPassword })
            res.status(200).json({ message: 'Şifre Başarıyla Değiştirildi' })

        } else {
            throw new Error('Not Found')
        }
    } catch (error) {
        res.status(404).json({ message: 'Kullanıcı Detayları Bulunamadı' });
    }

}


exports.pushNotification = async (req, res) => {
    const { message } = req.body;
    try {
        const admin = await User.findOne({ username: 'egecanyldrm' }).select('notification');
        let notifications = admin.notification;
        notifications.push({ message: message, isRead: false });
        await User.findOneAndUpdate({ username: 'egecanyldrm', notification: notifications })

        res.status(200).json({ message: 'Bildirim Başarıyla Eklendi' })
    } catch (error) {
        res.status(501).json({ message: 'Bildirim Eklenemedi ' });
    }

}

//Theme Settings Process 

exports.getTheme = async (req, res) => {
    try {
        const theme = await User.findById(req.user).select('theme -_id');
        res.status(200).json({ theme: theme })
    } catch (error) {
        res.status(404).json({ message: 'Tema Ayarları Bulunamadı ' });
    }

}
exports.themeSettings = async (req, res) => {
    try {
        const themeSettings = await User.findById(req.user).select('themeSettings -_id');
        res.status(200).json(themeSettings)
    } catch (error) {
        res.status(404).json({ message: 'Tema Ayarları Bulunamadı ' });
    }

}

exports.changeTheme = async (req, res) => {
    const { theme } = req.body;
    try {
        const result = await User.findOneAndUpdate({ _id: req.user }, { theme: theme });
        res.status(200).json({ message: 'Tema Değiştirildi ' })
    } catch (error) {
        res.status(501).json({ message: 'Tema Değiştirilemedi ' });
    }
}
exports.updateThemeSettingsGeneral = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user, { 'themeSettings.general': req.body });
        res.status(200).json({ message: 'Tema Ayarları Değiştirildi ' })
    } catch (error) {
        res.status(501).json({ message: 'Tema Ayarları Değiştirilemedi ' });
    }
}
exports.updateThemeSettingsSocial = async (req, res) => {

    try {
        await User.findOneAndUpdate({ _id: req.user }, { 'themeSettings.social': req.body });
        res.status(200).json({ message: 'Tema Ayarları Değiştirildi ' })
    } catch (error) {
        res.status(501).json({ message: 'Tema Ayarları Değiştirilemedi ' });
    }
}
exports.updateThemeSettingsColor = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user }, { 'themeSettings.color': req.body });
        res.status(200).json({ message: 'Tema Ayarları Değiştirildi ' })
    } catch (error) {
        res.status(501).json({ message: 'Tema Ayarları Değiştirilemedi ' });
    }
}

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await User.findById(req.user).select('-_id notification');
        res.status(200).json(notifications)
    } catch (error) {
        res.status(404).json({ message: 'Bildirimler Bulunamadı ' });
    }

}
exports.notificationRead = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findById(req.user);
        await user.readNotification(id)
        res.status(200).json({ message: 'Bildirim Okundu' })
    } catch (error) {
        res.status(404).json({ message: 'Bildirimler Bulunamadı ' });
    }

}