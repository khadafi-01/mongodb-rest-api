import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

}, {
    timestamps: true // added createdAt and updateAt fields
});

const Product = mongoose.model('Product', productSchema);
//products

export default Product;