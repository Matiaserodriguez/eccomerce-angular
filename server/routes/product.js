const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Product = require('../models/product');

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json({products});
    } catch(error) {
        console.log(error);
        return res.status(500).json({error});
    };
});

router.post('/', async (req, res, next) => {
    const maxProductId = sequenceGenerator.nextId("products");
  
    const product = new Product({
      id: maxProductId,
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price
    });
  
    product.save()
      .then(createdMessage => {
        res.status(201).json({
          message: 'Product added successfully',
          products: createdMessage
        });
      })
      .catch(error => {
         res.status(500).json({
            product: 'An error occurred',
            error: error
          });
      });
  });


router.put('/:id', async (req, res, next) => {
  console.log(req.body);
    Product.findOne({ id: req.params.id })
      .then(product => {
        product.name = req.body.name;
        product.description = req.body.description;
        product.imageUrl = req.body.imageUrl;
        product.price = req.body.price;
  
        Product.updateOne({ id: req.params.id }, product)
          .then(result => {
            res.status(204).json({
              product: 'Product updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             product: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          product: 'Product not found.',
          error: { product: 'Product not found'}
        });
      });
  });


router.delete("/:id", (req, res, next) => {
  Product.findOne({ id: req.params.id })
    .then(product => {
      Product.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            product: "Product deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           product: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        product: 'Product not found.',
        error: { product: 'Product not found'}
      });
    });
});

module.exports = router; 
