var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    payment_date:{
       type:String,
       required:true
    },
    payment_type:{
        type:String,
        required:true
    },
    product:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    transaction_id:{
        type:Number,
        required:true,
        unique:true
    }
});
//Quando o require acontecer, retornará um model mongoose User com os atributos de UserSchema
module.exports = mongoose.model('Payment', PaymentSchema);
