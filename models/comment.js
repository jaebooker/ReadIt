const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    content: { type: String, required: true }
});

Comment.pre("save", function(next) {
    //createdAt and updatedAt, the alpha and omega
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
module.exports = mongoose.model("Comment", Comment);
