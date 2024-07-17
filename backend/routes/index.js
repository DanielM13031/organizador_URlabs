const express = require('express');
const router = express.Router();
const functionscontroller = require('../controllers/functions')

router.get('/', functionscontroller.loginUser);

router.get('/products', functionscontroller.products);

router.get('/loan', functionscontroller.loan);

router.get('/teacher', functionscontroller.loginTeacher);

router.get('/student', functionscontroller.loginStudent);

router.get('/my_compovault', functionscontroller.myCompovault);

router.post('/new_product', functionscontroller.newProduct);

router.post('/delete_product', functionscontroller.deleteProduct);

router.post('/update_quantity', functionscontroller.updateQuantity);

router.post('/delete_quantity', functionscontroller.deleteQuantity);

router.post('/verify_user', functionscontroller.verifyUser);

router.get('/verify_role', functionscontroller.verifyRole);

router.get('/logout', functionscontroller.logOut);

router.post('/add_compovault', functionscontroller.addCompovault);

router.get('/loan_request',functionscontroller.loanRequest);

router.get('/see_request', functionscontroller.seeRequest);

router.get('/review_request', functionscontroller.reviewRequest);

module.exports = router;
