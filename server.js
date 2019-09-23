const express = require('express');
const app =express();
const bodyParser= require('body-parser');
const cors = require('cors');
const mongoose =require('mongoose');
const guestRoutes = express.Router();
const PORT = process.env.PORT || 4000;
const path = require("path");

let Guest= require("./guest_model");
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/guests',{ useNewUrlParser:true});
const connection= mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established successfully");
})

guestRoutes.route('/').get(function(req, res){
    Guest.find(function(err, guests){
        if(err){
            console.log(err)
        }
        else{
            res.json(guests);
        }
    });
});

guestRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Guest.findById(id, function(err,guest){
        res.json(guest);
    });
});

guestRoutes.route('/add').post(function(req,res){
    let guest = new Guest(req.body);
    guest.save()
         .then(guest => {
             res.status(200).json({'guest':'guest added successfully'});
         })
         .catch(err=>{
             res.status(400).send('adding new guest failed')
         });
});

guestRoutes.route('/update/:id').post(function(req, res){
    Guest.findById(req.params.id, function(err, guest){
        if(!guest)
            res.status(404).send('data is not found');
        else
            guest.entry_date=req.body.entry_date;
            guest.full_name= req.body.full_name;
            guest.city=req.body.city;
            guest.sub_city=req.body.sub_city;
            guest.woreda=req.body.woreda;
            guest.phone_number=req.body.phone_number;
            guest.house_number=req.body.house_number;
            guest.passport_or_id=req.body.passport_or_id;
            guest.purpose_of_stay=req.body.purpose_of_stay;
            guest.leaving_date=req.body.leaving_date;

            guest.save().then(guest=>{
                res.json('Guest Updated')
            })
            .catch(err=>{
                res.status(400).send("Update is not possible");
            });
    });
});
app.use('/guests',guestRoutes);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}
app.listen(PORT, function(){
    console.log("Server is running on Port: " + PORT);
})