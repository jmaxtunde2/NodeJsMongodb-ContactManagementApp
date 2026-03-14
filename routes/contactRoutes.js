const express = require("express");
const router = express.Router();
const {getContacts, createContact, getContact, updateContact, deleteContact} = require("../controller/contactController");
const validateTokenHandler = require("../middleware/validateTokenHandler");

router.use(validateTokenHandler); // Apply the validateTokenHandler middleware to all routes in this router

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
router.route('/').get(getContacts);
// @route GET /api/contacts
router.route('/').get(getContacts);

// @route POST /api/contacts
router.route('/').post(createContact);

// @route GET /api/contacts/:id
router.route('/:id').get(getContact);

// @route PUT /api/contacts/:id
router.route('/:id').put(updateContact);

// @route DELETE /api/contacts/:id
router.route('/:id').delete(deleteContact);


module.exports = router;