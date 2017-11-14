var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    product:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});
//Quando o require acontecer, retornará um model mongoose User com os atributos de UserSchema
module.exports = mongoose.model('Product', ProductSchema);
