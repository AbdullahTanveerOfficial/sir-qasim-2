const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  // UNIQUE field
    phone: { type: String, required: true, unique: true },  // UNIQUE field
    password: { type: String, required: true }
});

// Hash password before saving the user
enquirySchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("Enquiry", enquirySchema);
