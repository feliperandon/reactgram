const express = require("express");
const router = express.Router();

// Controller

// Middlewares
const { photoInsertvalidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

// Routes

module.exports = router;
