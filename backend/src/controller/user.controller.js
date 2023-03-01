const express = require('express');
const { Model } = require('mongoose');

const router = express.Router();

const model = require('../model/user.model')

router.get('/allusers', async (req, res) => {
    try {

        const gender = req.query.gender;

        let filters = {};
        if (gender) {
          filters.gender = gender;
        }
    
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit;
    
        const count = await model.countDocuments(filters);
        const totalPages = Math.ceil(count / limit);
    
        const users = await model.find(filters).skip(skip).limit(limit).lean().exec();
    
        const response = {
          status: true,
          TotalDataCount: count,
          DataCount: users.length,
          totalPages: Math.max(totalPages, 1),
          currentPage: page,
          limit,
          data: users,
        };
    
    
        return res.status(200).send(response);

    } catch (err) {
        return res.status(404).send({ message: err.message, status: 'failed' })
    }
})

router.post('/addusers', async (req, res) => {
    try {
        const users = req.body; 

        const result = await model.insertMany(users);

        return res.status(200).send(result);
    } catch (err) {
        return res.status(404).send({ message: err.message, status: 'failed' });
    }
});


router.delete('/deleteAllUsers', async (req, res) => {
    try {
        const result = await model.deleteMany();
        return res.status(200).send({ message: 'All users deleted', status: 'success' });
    } catch (err) {
        return res.status(500).send({ message: err.message, status: 'failed' });
    }
});



module.exports = router;