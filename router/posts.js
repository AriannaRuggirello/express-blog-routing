// importo express
const express = require('express');
// istanza router
const router= express.Router();
// importo il controller
const homecontroller = require('../controller/home');

// index
// definizione rotte 
router.get('/', homecontroller.index);



// esporto
module.exports= router;