const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");
// @desc Get all contacts
// @route GET /api/contacts
// @access Private 
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find(); // Fetch all contacts from the database
    res.status(200).json({
        "message": "Get all contacts",
        "contacts": contacts
    });
})

// @desc Create a contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body); // Log the request body to the console for debugging
    const {name,email,phone} = req.body; // Destructure the name, email, and phone from the request body
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user._id
    }); // Create a new contact in the database with the provided name, email, and phone
    res.status(201).json({
        "message": "Contact created successfully",
        "contact": contact
    });
});

// @desc Get a contact
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); // Fetch a contact by its ID from the database
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({
        "message": `Get a contact with id ${req.params.id}`,
        "contact": contact
    });
});

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); // Fetch a contact by its ID from the database
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User not authorized");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    ); // Update the contact with the provided data in the request body and return the updated contact

    res.status(200).json({
        "message": `Update a contact with id ${req.params.id}`,
        "contact": updatedContact
    });
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); // Fetch a contact by its ID from the database
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User not authorized");
    }

    await contact.remove(); // Remove the contact from the database
    res.status(200).json({
        "message": `Delete a contact with id ${req.params.id}`,
        "contact": contact
    });
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}