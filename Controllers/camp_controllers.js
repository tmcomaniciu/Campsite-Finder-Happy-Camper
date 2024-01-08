const Camp = require('../Models/Camp')

const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        const camp = await Camp.find()
        res.json(camp)
    } catch(error) {
        console.log('Error', error);
        res.status(500).json({message: 'error getting all camp sites'})
    }
})

router.post('/', async (req, res) => {
    try {
        await new Camp({...req.body}).save()
        res.status(200).json({message: 'camp created'})
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({message: 'error creating camp site'})
    }

})

module.exports = router