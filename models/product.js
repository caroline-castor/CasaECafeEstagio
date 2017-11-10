var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    product:String,
    price:Number,
    description:String
});
//Quando o require acontecer, retornará um model mongoose User com os atributos de UserSchema
module.exports = mongoose.model('Product', ProductSchema);
