const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.post('/login', async (req, res, next) => {
    const params = await req.body;
    const { userId, userPw } = params;
    if(!userId || !userPw) return next(createError(400, 'user_id or user_pw is not exist'));

    try {


    }catch(err) {

    }

    res.json('hello')
})


router.post('/register', async (req, res, next) => {
    const params = await req.body;
    let response = null;

    try {
        console.log(params)
    }catch (err) {

    }

    res.json(response)
})


router.get('/hello', (req, res, next) => {
    const name = req.query.name || 'WORLD';

    res.json({
        message: `Hello ${name}`
    })


})


module.exports = router;