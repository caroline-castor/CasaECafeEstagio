var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    payment_date:String,
    payment_type:String,
    product:String,
    product_price:Number,
    discount:Number,
    price:Number
});
//Quando o require acontecer, retornará um model mongoose User com os atributos de UserSchema
module.exports = mongoose.model('Payment', PaymentSchema);
