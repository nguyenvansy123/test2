const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");


exports.getCategories = (req, res) => {
    Category.find({})
        .then((categories) => {
            if (categories) {
                const category = [...categories,]
                res.status(200).json({ categories })
            }
        })
        .catch((error) => {
            if (error) return res.status(400).json({ error })
        })
}

exports.addCategory = (req, res) => {

    Category.findOne({ name: req.body.name })
        .then(async (_cat) => {
            if (_cat) {
                return res.status(406).json({ message: "danh mục này đã được tạo" })
            }

            const categoryObj = {
                name: req.body.name,
                slug: req.body.slug,
                createdBy: req.user._id
            }
        
            const cat = new Category(categoryObj);

            cat.save().then((category) => {
                if (category) {
                    return res.status(201).json({ category })
                }
            }).catch((err) => {
                if (err) return res.status(400).json({ err })
            })

        }).catch((err) => {
            console.log(err)
        });
}


exports.updateCategories = async (req, res) => {

    try {
        const { id, name, slug } = req.body;
        // Kiểm tra xem đối tượng có tồn tại không
        const existingCategory = await Category.findOne({ _id:id });

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const newCategory = {
            name: name,
            slug: slug,
        }

        // update đối tượng
        const updateCategory = await Category.findByIdAndUpdate(id, newCategory, { new: true });
        res.status(201).json({ message: 'Category update successfully', updateCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteCategories = async (req, res) => {
    try {
        const { id } = req.body;
        const existingCategory = await Category.findOne({
            _id: id,
        });

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Xóa đối tượng
        const deletedCategory = await Category.findOneAndDelete({
            _id: id,
        });

        res.status(201).json({ message: 'Category removed successfully', deletedCategory });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}


