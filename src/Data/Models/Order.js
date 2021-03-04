const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    distance:{type:String},
    status:{type:String,default:'UNASSIGNED'}
})