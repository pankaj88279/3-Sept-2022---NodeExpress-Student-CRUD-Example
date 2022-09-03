const express=require('express')
const mongoose = require('mongoose');
const app=express();
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017')
.then((d)=>{
console.log('connected')
})
.catch((e)=>{
console.log('not connected')
})

//const Cat = mongoose.model('Cat', { name: String });
const studentSchema =  new mongoose.Schema({ name:String, 
                                    surname:String,
                                    adress:String
                                 });
            

app.get('/student',(req,res)=>{
    const Student= mongoose.model('Student',studentSchema) 
    const studentobject = new Student(req.query);
    studentobject.save()
        .then((d)=>{
    console.log('saved')
        })
        .catch((e)=>{
        console.log('not saved')
        })
       
      
     res.status(200).json({
        
        name:req.params.name,
        surname:req.params.surname,
        adress:req.params.adress,

        msg:"done"


    })
})

let port=process.env.port

app.listen(port,()=>{
    console.log('port running on port',port)
})