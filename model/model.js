const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    employeeId: {
        type: Number,

    },
    userName: {
        type: String,
        required: true,
    },
    passWord: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    startDate: {
        type: Date,
    }

});

const Credentials = mongoose.model("Credentials", UserSchema);

module.exports = Credentials;