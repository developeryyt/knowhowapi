const express = require('express');
const router = express.Router();

router.post('/login', async (req, res, res) => {
    const params = await req.body;
    console.log(params)

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