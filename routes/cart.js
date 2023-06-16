const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const CartItem=require('../models/CartItem')

router.get('/fetchCart', fetchuser, async (req, res) => {
    try {
        const cart = await CartItem.find({ user: req.user.id });
        res.json(cart)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.post('/addBook', fetchuser, async (req, res) => {
        try {
            const { title, author, cost,image_url } = req.body;
            const cartitem = new CartItem({
                title, author, cost,image_url, user: req.user.id
            })
            const savedcart = await cartitem.save()

            res.json(savedcart)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    router.delete('/deleteBook/:id', fetchuser, async (req, res) => {
        try {
            // Find the note to be delete and delete it
            let book = await CartItem.findById(req.params.id);
            if (!book) { return res.status(404).send("Not Found") }
    
            // Allow deletion only if user owns this Note
            if (book.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
    
            note = await CartItem.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Book has been deleted from Cart", note: note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    module.exports = router