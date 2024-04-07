const express = require('express');
const router = express.Router();

router.post('/login', async (req, res, res) => {
    const params = await req.body;

    try {

    }catch(err) {

    }

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