const { default: slugify } = require("slugify");
const Product = require("../models/product");
const Category = require("../models/category");


exports.createProduct = (req, res) => {

    const { name, price, description, category, quantity, createdBy } = req.body;
    console.log(req.body.name);
    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename };
        });

    }
    const product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
    });
    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product, files: req.files });
        }
    });
}

exports.getProducts = async (req, res) => {
    const product = await Product.find({})
        .select("_id name price quantity slug description productPictures category")
        .populate({ path: "category", select: "_id name" })
        .exec();


    function sortFunction(a, b) {
        var dateA = new Date(a.createdAt).getTime();
        var dateB = new Date(b.createdAt).getTime();
        return dateA > dateB ? 1 : -1;
    };
    res.status(200).json({
        product,
        productFilter: {
            newProduct: product.sort(sortFunction).slice(0, 4),
            productSlice: product.slice(0, 8)
        }
    })
}

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
   
    if (productId) {

         Product.findOne({ _id: productId }).exec((error, product) => {
            if (error) return res.status(400).json({ error });
            if (product) {
                res.status(200).json({ product });
            }
        });
    } else {
        return res.status(400).json({ error: "Params required" });
    }
};

exports.getProductsBySulg = async (req, res) => {
    const { slug } = req.params;
    Category.find({ slug })
        .select("_id")
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error });
            }

            if (category) {
                Product.find({ category: category._id })
                    .exec((error, product) => {
                        if (error) {
                            return res.status(400).json({ error })
                        }
                        if (product) {
                            return res.status(200).json({ product })
                        }
                    })
            }
        })

}

exports.deleteProductById = (req, res) => {
    const { productId } = req.body.payload;

    if (productId) {
        Product.deleteOne({ _id: productId }).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                res.status(202).json({ result });
            }
        });
    } else {
        res.status(400).json({ error: "Params required" });
    }
};

