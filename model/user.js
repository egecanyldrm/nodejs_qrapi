const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    package: {
        type: String,
        required: false,
    },
    theme: {
        type: String,
        required: false,
        default: 'athena'
    },
    role: {
        isCustomer: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    yearlyPrice: String,
    notification: [
        {
            message: {
                type: String,
                required: true
            },
            isRead: {
                type: Boolean,
                default: false
            }
        }
    ],
    resetToken: String,
    resetTokenExpiration: Date,
    userLogo: {
        type: String,
        required: false
    },
    qrcode: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    licenseOverDate: {
        type: Date,
        default: () => Date.now() + 365 * 24 * 60 * 60000
    },
    themeSettings: {
        general: {

            english: {
                type: Boolean,
                default: false
            },
            russian: {
                type: Boolean,
                default: false
            },
            germany: {
                type: Boolean,
                default: false
            },
            arab: {
                type: Boolean,
                default: false
            },
            french: {
                type: Boolean,
                default: false
            },
            footerSocial: {
                type: Boolean,
                default: true
            },
            autoLocaleDetection: {
                type: Boolean,
                default: false
            }
        }
        ,
        social: {
            instagram: {
                type: String,
                default: ''
            },
            facebook: {
                type: String,
                default: ''
            },
            twitter: {
                type: String,
                default: ''
            },
            youtube: {
                type: String,
                default: ''
            }
        },
        color: {
            themeColor: {
                type: String,
                default: ''
            },
            textColor: {
                type: String,
                default: '#000000'
            }
        }
    }
}, { timestamps: true })


userSchema.methods.addNotification = function (message) {
    const notifications = this.notification;
    notifications.push({ message: message });
    this.notification = [
        ...notifications
    ]
    console.log(this.notification)
    return this.save();
}
userSchema.methods.readNotification = function (id) {

    const notifications = this.notification;

    const newNotifications = notifications.map((item) => {
        if (item._id.toString() === id.toString()) {
            item.isRead = true;
        }
        return item

    })
    this.notification = newNotifications

    return this.save();
}
userSchema.methods.resetPassword = function (newPassword) {
    this.password = newPassword
    this.resetToken = undefined;
    this.resetTokenExpiration = undefined
    return this.save();
}
module.exports = mongoose.model('User', userSchema); 