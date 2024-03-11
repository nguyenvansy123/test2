const { default: slugify } = require("slugify");
const Article = require("../models/article");
const Category = require("../models/category");
const { isImage, deleteFile } = require("../common-middleware");


const createUniqueSlug = async (title) => {
    let slug = slugify(title);
    let slugExists = await Article.findOne({ slug });

    let count = 1;
    while (slugExists) {
        slug = `${slug}-${count}`;
        slugExists = await Article.findOne({ slug });
        count++;
    }

    return slug;
};

exports.createPost = async (req, res) => {

    const { title, publisher, numberOfPage, linkDowload, categoryId, articlePictures, linkPreview } = req.body;

    const _slug = await createUniqueSlug(title)
    const _linkDowload = req.files['linkDowload'][0].filename;
    const _articlePictures = req.files['arliclePictures'][0].filename;

    const post = new Article({
        title,
        publisher,
        numberOfPages: numberOfPage,
        linkDownload: _linkDowload,
        arliclePictures: _articlePictures,
        slug: _slug,
        category: categoryId,
        createdBy: req.user._id,
        // linkPreview
    });
    // console.log(post)

    post.save()
        .then(savedPost => {
            if (savedPost) {
                res.status(201).json({ post: savedPost, message: "Post created successfully" });
            } else {
                throw new Error("Failed to save post");
            }
        })
        .catch(_error => {
            return res.status(500).json({ error: _error });
        });
}


exports.getAllPostById = async (req, res) => {
    const { id } = req.params;
    Article.find({ createdBy: id })
        .then((posts) => {
            if (posts) {
                res.status(200).json({ posts });
            }
        })
        .catch((error) => {
            if (error) return res.status(400).json({ error });
        });
}

exports.getAllPost = async (req, res) => {

    Article.find({})
        .then((posts) => {
            if (posts) {
                res.status(200).json({ posts })
            }
        })
        .catch((error) => {
            if (error) return res.status(400).json({ error })
        })
}

exports.getPostsByUser = (req, res) => {
    const { id } = req.params;
    Article.find({ createdBy: id })
        .then((posts) => {
            if (posts) {
                res.status(200).json({ posts })
            }
        })
        .catch((error) => {
            if (error) return res.status(400).json({ error })
        })
}

exports.getPendingApprovedPosts = async (req, res) => {
    try {
        const articles = await Article.find({ status: { $ne: "đã được phê duyệt" } });
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: "An error occurred" });
    }

};

exports.getApprovedPosts = async (req, res) => {
    try {
        const articles = await Article.find({ status: { $ne: "chờ phê duyệt" } });
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: "An error occurred" });
    }
}

exports.updateApprovrePost = async (req, res) => {
    try {
        const { articleId } = req.params
        const articles = await Article.findByIdAndUpdate(articleId, { status: "đã được phê duyệt" }, { new: true });
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: "An error occurred" });
    }
}

exports.deletePostById = (req, res) => {
    const { id } = req.params;

    if (id) {
        Article.findOneAndDelete({ _id: id })
            .then((result) => {
                if (result) {
                    // Xóa các tệp ảnh và tệp word liên quan
                    deleteFile(result.arliclePictures, result.linkDownload);

                    res.status(202).json({ message: "Article deleted successfully" });
                } else {
                    res.status(404).json({ error: "Article not found" });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: "Internal server error", message: error.message });
            });
    } else {
        res.status(400).json({ error: "Params required" });
    }
};

exports.updatePostById = async (req, res) => {
    try {
        const { title, publisher, numberOfPage, linkDowload, arliclePictures, categoryId, linkPreview } = req.body;

        const existingCategory = await Category.findOne({ _id: id });

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const newCategory = {
            title, publisher, numberOfPage, linkDowload, arliclePictures, categoryId, linkPreview
        }


        const updateCategory = await Category.findByIdAndUpdate(id, newCategory, { new: true });
        res.status(201).json({ message: 'Category update successfully', updateCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateStatusPostById = async (req, res) => {
    try {
        const { articleId, newStatus } = req.body;
        console.log(req.body)
        const article = await Article.findById(articleId);

        // If the article is not found
        if (!article) {
            throw new Error('Article not found');
        }

        // Get the enum values of the status field
        const statusEnumValues = Object.values(Article.schema.path('status').enumValues);
        // Check if the new position is within the enum values range
        if (newStatus < 0 || newStatus >= statusEnumValues.length) {
            throw new Error('Invalid position');
        }

        // Update the status based on the new position
        article.status = statusEnumValues[newStatus];
        // Save the updated article to the database
        await article.save();
        // Return the updated article
        return res.status(201).json({ message: 'Status updated successfully', article });

    } catch (error) {
        res.status(500).json({ message: `Error updating article status: ${error.message}` });
    }
};

exports.downloadFile = async (req, res) => {

    const { filename } = req.body
    console.log(filename);
    // Xác định đường dẫn tệp cần tải xuống
    const filePath = 'uploads/words/' + filename; // Đường dẫn đến tệp PDF bạn muốn người dùng tải xuống

    console.log(filePath);
    // Gửi tệp đến trình duyệt của người dùng để tải xuống
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('File downloaded successfully');
        }
    });
}


