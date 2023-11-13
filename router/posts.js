// importo express
const express = require('express');
// istanza router
const router= express.Router();
// importo il controller
const homecontroller = require('../controller/home');

// index
// definizione rotte 
router.get('/', homecontroller.index);
// show
router.get('/:slug', homecontroller.show);
// create
router.get('/:id/create', homecontroller.create);


// esporto
module.exports= router;