import Product from "../models/product.model.js";

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"

        });
    }
}

export const createProducts = async(req, res) => {
    const product = req.body;


    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields"
        });
    }


    const existingProduct = await Product.findOne({ name: product.name });
    if (existingProduct) {
        return res.status(400).json({
            success: false,
            message: "Product with this name already exists"
        })
    }
    const newProduct = new Product(product);


    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        console.error("Error in create Product:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const updateProducts = async(req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"

        });
    }
}

export const searchProducts = async(req, res) => {

    const { name } = req.query;

    try {
        const products = await Product.find({
            name: { $regex: name, $options: "i" }
        });

        if (products.length === 0) {
            return res(404).json({
                success: false,
                message: "No products found"
            });
        }

        res.status(200).json({
            success: true,
            message: products
        });

    } catch (error) {
        console.error("Error in search products:", error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

export const deleteProducts = async(req, res) => {

    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log("Error in deleting Product:", error.message);
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }
}

export const deleteAllProducts = async(req, res) => {
    try {
        const result = await Product.deleteMany({});

        if (result.deletedCount === 0) {
            return res.status(200).json({
                success: true,
                message: "No products to delete",
            });
        }
        res.status(200).json({
            success: true,
            message: `${result.deletedCount} products deleted successfully`,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}