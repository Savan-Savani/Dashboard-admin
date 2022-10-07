const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true

    },
    employee: { type: Schema.Types.ObjectId, ref: "Credentials" },
    product: { type: Schema.Types.ObjectId, ref: "ProductModel" },
    date: {
        type: Date,
    },
    status: {
        type: Boolean
    }

});

const ProductionModel = mongoose.model("ProductionModel", UserSchema);

module.exports = ProductionModel;