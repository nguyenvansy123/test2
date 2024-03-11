const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["thành viên không chính thức", 'quản trị viên',"thành viên"],
        default: "thành viên không chính thức",
    },
    contactNumber: { type: String },
    pofilePicture: { type: String },
}, { timestamps: true });

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    }

}


module.exports = mongoose.model("User", userSchema); 