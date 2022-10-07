const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    companyname: {
        required: true,
        type: String,
    },
    address: {
        type: String,
    },
    gstnumber: {
        type: String,
    },
    mobilenumber: {
        type: Number,
    },
    data: {
        type: Array,
    },
    item: {
        type: String
    },
    ppu: {
        type: Number
    },
    units: {
        type: Number
    },
    total: {
        type: Number
    },
    gst: {
        type: Number
    },
    gstPercentage: {
        type: Number
    },
    grandtotal: {
        type: Number
    },
    date: {
        type: Date
    },
    invoiceNumber: {
        type: String
    }
});

const BillingModel = mongoose.model("BillingModel", UserSchema);

module.exports = BillingModel;