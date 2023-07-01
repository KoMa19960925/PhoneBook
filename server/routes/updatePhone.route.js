const express = require('express');
const phoneBook = require('../mongodb/model/phonebook');

const router = express.Router();

router.put('/:id' , async (req, res) => {
    try{
        const { id } = req.params;
        const { name, phone } = req.body;

        const phoneNumber = await phoneBook.findByIdAndUpdate(
            id,
            { name, phone },
            { new: true }
            );

        res.status(201).json({
            status: 'Success',
            data: {
                phoneNumber,
            },
        });
    } catch(error){
        res.status(500).json({
            status: 'Failed',
            data:{
                error
            },

        });
    }
});

module.exports = router;