const express = require('express');
const userCont = require('../Controllers/UserControllers');

const router = express.Router();
router.post('/login', userCont.login)
router.post('/create', userCont.createUser)
router.get('/get', userCont.getAll)
router.put('/modify/:id', userCont.update)
router.delete('/delete/:id', userCont.delete)


module.exports = router
