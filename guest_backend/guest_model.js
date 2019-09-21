const mongoose= require('mongoose');
const Schema= mongoose.Schema;

let Guest = new Schema({
    entry_date:{
        type: Date
    },
    full_name:{
        type:String
    },
    city:{
        type:String
    },
    sub_city:{
        type:String
    },
    woreda:{
        type:String
    },
    phone_number:{
        type:String
    },
    house_number:{
        type:Number
    },
    passport_or_id:{
        type:String
    },
    purpose_of_stay:{
        type:String
    },
    leaving_date:{
        type:Date
    }

});

module.exports = mongoose.model("Guest",Guest);