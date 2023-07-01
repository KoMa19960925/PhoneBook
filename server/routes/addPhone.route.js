const express = require('express');
const phoneBook = require('../mongodb/model/phonebook');

const router = express.Router();

router.post('/', async(req, res) => {
    try{
        const phoneNumber = new phoneBook(req.body);
        await phoneNumber.save();
        res.status(201).json({
            status: "Success",
            data: {
                phoneNumber
            }
        });
    } catch(error){
        res.status(500).json({
            status: "Failed",
            data:{
                error
            }

        });
    }
});

module.exports = router;