var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
    responses: [{type: Schema.Types.ObjectId, ref: 'Response'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
}, {timestamps: true});
mongoose.model('User', userSchema);

var postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    responses: [{type: Schema.Types.ObjectId, ref: 'Response'}]
}, {timestamps: true});
mongoose.model('Post', postSchema);

var responseSchema = new mongoose.Schema({
    text: {type: String, required: true},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});
mongoose.model('Response', responseSchema);

var commentSchema = new mongoose.Schema({
    text: {type:String, required: true},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    _response: {type: Schema.Types.ObjectId, ref: 'Response'}
}, {timestamps: true});
mongoose.model('Comment', commentSchema);
