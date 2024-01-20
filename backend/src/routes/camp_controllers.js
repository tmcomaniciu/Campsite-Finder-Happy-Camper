import express from 'express'
import Camp from '../models/Camp.js'
import Review from '../models/Review.js'
import { Console } from 'console'

const router = express.Router()

router.get('/', async (req, res) => {
    const searchBy = Object.keys(req.query)[0]
    const searchByValue = req.query[searchBy]
    try {
        if (searchBy === undefined) {
            // console.log()
            const camp = await Camp.find()
            res.json(camp)
        } else {
            let camp
            switch (searchBy) {
                case 'state':
                    camp = await Camp.find({ state: { $eq: searchByValue } })
                    res.json(camp)
                    break;
                case 'city':
                    camp = await Camp.find({ city: { $eq: searchByValue } })
                    res.json(camp)
                    break;
                default:
                    camp = await Camp.find({ name: { $regex: searchByValue } })
                    res.json(camp);
            }
        }

    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'error getting all camp sites' })
    }

})

router.get('/price', async (req, res) => {
    try {
        const camp = await Camp.find({ $and: [{ price: { $gte: req.query.min } }, { price: { $lt: req.query.max } }] })
        res.json(camp)
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'error getting all camp sites' })
    }

})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const camp = await Camp.findById(id).populate('reviews');
        // console.log(camp)
        res.json(camp)
    }
    catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error getting particular camp site' })
    }
})

router.post('/:id/reviews', async (req, res) => {
    try {
        const camp = await Camp.findById(req.params.id)
        console.log('req', req.params.id);
        const review = new Review(req.body)
        camp.reviews.push(review)
        await review.save()
        await camp.save()
        res.send('reviews added')
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'error adding a review to camp site' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const reqCamp = req.body.camp
        const deleteImages = req.body.deleteImages
        // console.log('put', reqCamp, deleteImages);

        if (reqCamp.imageURLs) {
            // console.log('inside image', id);
            let camp = await Camp.findByIdAndUpdate(id, { $push: { imageURLs: reqCamp.imageURLs } }, { new: true })
            let reqObject = reqCamp
            delete reqObject['imageURLs']
            if (reqObject) {
                camp = await Camp.findByIdAndUpdate(id, { ...reqObject }, { new: true })
            }
            if (deleteImages) {
                camp = await Camp.updateOne({ _id: id }, { $pull: { imageURLs: { $in: deleteImages } } })
            }
            res.json(camp)
        } else {
            let camp = await Camp.findByIdAndUpdate(id, { ...reqCamp }, { new: true })
            if (deleteImages) {
                camp = await Camp.updateOne({ _id: id }, { $pull: { imageURLs: { $in: deleteImages } } })
            }
            res.json(camp)
        }

    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error updating a camp site' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const camp = await Camp.findByIdAndDelete(id)
        res.json(camp)
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: 'error in deleting a camp' })
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        await new Camp({ ...req.body }).save()
        res.status(200).json({ message: 'camp created' })
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'error creating camp site' })
    }

})

export default router