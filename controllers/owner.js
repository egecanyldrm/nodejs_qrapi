const Category = require('../model/category');
const Product = require('../model/product');
const User = require('../model/user');
const fs = require('fs')
const bcrypt = require('bcrypt');
const qs = require('qs');
const emailTemplate = require('../assets/mailTemplate')
const sgMail = require('@sendgrid/mail');
const path = require('path')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ 'role.isCustomer': { $ne: false } }).select('username name contact').sort({ createdAt: -1 })
        res.status(200).send(customers)
    } catch (err) {
        res.status(404).json({ message: 'Müşteri Bulunamadı' });
    }
}

//Register Processing
exports.postRegister = async (req, res, next) => {
    const body = (qs.parse(req.body.user))
    const { password, ...others } = body;

    try {
        const user = await User.findOne({ 'contact.email': others.contact.email });
        if (user) {
            // Kullanıcı varsa yüklediği dosya silinip geri cevap gönderilir.
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
            return res.status(500).json({ message: 'Bu email daha önceden kayıt edilmiş' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            password: hashedPassword,
            qrcode: req.file.path.substring(2),
            ...others

        });
        await newUser.save()

        const msg = {
            to: others.contact.email,
            from: process.env.EMAIL_FROM,
            subject: 'Hoşgeldiniz',
            html: emailTemplate.welcomeTemplate(others.name, others.contact.email, password, (process.env.FRONT_END_URL + '/login')),
        }

        await sgMail.send(msg).catch((error) => { throw error })
        res.status(201).send({ message: 'Kayıt başarılı bir şekilde yapıldı' });

    } catch (err) {
        //Ekleme işleminde hata olursa sunucuya yüklenen resim silinir
        if (req.file.path) {
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
        res.status(501).json({ error: err, status: 500, message: 'Kullanıcı adı daha önceden kayıt edilmiş ' });
    }
}

exports.getCustomer = async (req, res) => {
    const { customerId } = req.body
    try {
        const customer = await User.findById(customerId).select('username name contact package companyName qrcode yearlyPrice  ');
        if (!customer) {
            return res.status(404).json({ message: 'Müşteri Bulunamadı' });
        }
        customer.qrcode = process.env.API_URL + customer.qrcode
        res.status(200).json(customer)
    } catch (err) {
        res.status(404).json({ message: 'Müşteri Bulunamadı' });
    }
}

exports.updateCustomer = async (req, res, next) => {
    const body = (qs.parse(req.body.user))
    // Eğer resim gelmiş ise jsona qrcode de eklenip güncelleniyor
    const json = req.file ? { ...body, qrcode: req.file.path.substring(2) } : body;
    let qrcode;
    try {
        const customer = await User.findById(json._id);
        qrcode = customer.qrcode;
        await customer.updateOne(json);

        // Eğer resim yüklenmişse eski resim kontrol edilip silinir 
        if (req.file) {
            fs.access(path.join('..', qrcode), fs.constants.F_OK, (err) => {
                //Dosya yoksa null değer dönüyor 
                if (!err) {
                    //Eğer Dosya varsa 
                    fs.unlink(path.join('..', qrcode), (err) => {
                        if (err) {
                            console.log('Dosya silinemedi ')
                        }
                    })
                }
            });
        }
        res.status(201).send({ message: 'Kayıt başarılı bir şekilde yapıldı' });

    } catch (err) {

        //Güncelleme işleminde hata olursa sunucuya yüklenen resim silinir
        if (req.file.path) {
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
        res.status(501).json({ error: err, status: 500, message: 'Kullanıcı adı daha önceden kayıt edilmiş ' });
    }

}



exports.deleteCustomer = async (req, res) => {

    const { customerId } = req.body;
    let imageUrls = [];
    try {
        const customer = await User.findById(customerId).select('qrcode userLogo -_id')
        if (customer) imageUrls.push(...Object.values(customer._doc));

        const categories = await Category.find({ userId: customerId }).select('imageUrl -_id');
        if (categories) categories.map(item => imageUrls.push(item.imageUrl))

        const products = await Product.find({ userId: customerId }).select('imageUrl -_id');
        if (products) products.map(item => imageUrls.push(item.imageUrl))

        imageUrls.map(image => {
            fs.access(path.join('..', image), fs.constants.F_OK, (err) => {
                //Dosya yoksa null değer dönüyor 
                if (!err) {
                    //Eğer Dosya varsa 
                    fs.unlink(path.join('..', image), (err) => {
                        if (err) {
                            console.log('Dosya silinemedi ')
                        }
                    })
                }
            });
        })

        await User.deleteOne({ _id: customerId });
        await Category.deleteMany({ userId: customerId });
        await Product.deleteMany({ userId: customerId });
        res.status(200).send({ message: 'Silme işlemi başarılı bir şekilde yapıldı' });

    } catch (err) {
        res.status(501).json({ error: err, status: 500, message: 'Kullanıcı Silinemedi ' });
    }

}
