const express = require('express');
const router = express.Router();

//Controller
const adminController = require('../controllers/admin')
//JsonWeb Token Middleware
const authJwt = require('../middleware/auth');

//Routes 

//Category Process
router.get('/categories', authJwt, adminController.getCategories);

router.post('/add-category', authJwt, adminController.addCategory);

router.post('/get-category', authJwt, adminController.getCategory);

router.post('/edit-category/:categoryid', authJwt, adminController.editCategory);

router.post('/delete-category', authJwt, adminController.deleteCategory);

//Product Process

router.get('/products', authJwt, adminController.getProducts);

router.post('/remove-product-image', authJwt, adminController.removeProductImage);

router.post('/add-product', authJwt, adminController.addProduct);

router.post('/get-product', authJwt, adminController.getProduct);

router.post('/edit-product/:productid', authJwt, adminController.editProduct);

router.post('/delete-product', authJwt, adminController.deleteProduct);


//Bussiness Process 
router.get('/business-detail', authJwt, adminController.getBusinessDetail)

router.post('/remove-logo', authJwt, adminController.removeLogo)

router.post('/update-business-detail', authJwt, adminController.updateBusinessDetail)

router.post('/change-password', authJwt, adminController.changePassword)

router.post('/push-notification', authJwt, adminController.pushNotification)

// Theme Settings Process 

router.get('/get-theme', authJwt, adminController.getTheme)

router.get('/theme-settings', authJwt, adminController.themeSettings)

router.post('/change-theme', authJwt, adminController.changeTheme)

router.post('/update-theme-settings/general', authJwt, adminController.updateThemeSettingsGeneral)
router.post('/update-theme-settings/social', authJwt, adminController.updateThemeSettingsSocial)
router.post('/update-theme-settings/color', authJwt, adminController.updateThemeSettingsColor)

// Translate

router.post('/category-translate', authJwt, adminController.categoryTranslate)
router.post('/product-translate', authJwt, adminController.productTranslate)



router.get('/notifications', authJwt, adminController.getNotifications)
router.post('/notification-isread', authJwt, adminController.notificationRead)

module.exports = router;