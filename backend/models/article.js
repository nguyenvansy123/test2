const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    publishDate :{
        type:String,
        trim:true
    }    ,
    numberOfPages: {
        type: Number,
        required: true
    },
    linkDownload: {
        type: String,
        required: true,
        trim: true
    },
    arliclePictures: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    viewTotal: {
        type: Number,
        default: 0
    },
    downloadTotal: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['chờ phê duyệt', 'đã được phê duyệt'],
        default: 'chờ phê duyệt'
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isShow: {
        type: Boolean,
        default: false
    },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Article', articleSchema);