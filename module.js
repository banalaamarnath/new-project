var mongoose = require("mongoose");
var schema = mongoose.Schema({
    name: String,
    status: String
});
var todo = mongoose.model('todos', schema);
module.exports = { todo };