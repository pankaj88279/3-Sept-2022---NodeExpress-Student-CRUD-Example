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
const studentSchema =  new mongoose.Schema
                            ({ name:String, 
                               surname:String,
                               adress:String
                            },{
                                timesTamp:true,

                                 });
const Student= mongoose.model('Student',studentSchema) 

     app.get('/student',(req,res)=>{

    console.log(req.query.name)
    if(req.query.name !== undefined){

        const studentobject = new Student({ 
        
            studentid:req.query.studentid,
            name:req.query.name,
            surname:req.query.surname,
            adress:req.query.address
        
              });
             
    
          studentobject.save()       
           .then((d)=>{
           console.log('saved');
    
           res.status(200).json({
            msg:"student created",
            data:d
           })
    
            })
           .catch((e)=>{
          console.log('not saved')
          res.status(400).json({
            msg:"error",
            error:e
          })
    })

}else{
    res.status(400).json({
            msg:"parameter required"
        
        })
}
           
 
})

app.get('/api/getAllStudents',(req,res)=>{

    //db.collection.find()
    //Model.find();

    //db.collection = Model
    Student.find()
    .then(d=>{
        res.status(200).json({
            mgs:"ok",
            data:d
        });
    })
    .catch(e=>{
        res.status(400).json({
            mgs:"err"+e
        });
    });

    
});


app.delete('/:studentid',(req,res)=>{

    console.log(req.params.studentid);

    if(req.params.studentid !==undefined){
    Student.deleteOne({
    _id:req.params.studentid

 }).then((d)=>{
    
    res.status(200).json({
        msg:"daleted documets",
        
    })
 }).catch(()=>{

         res.status(400).json({
        msg:"not daleted documets",
        
    })
 });

  }else{

    res.status(400).json({
        msg:"id required",
        
    })
  }  
})

let port=process.env.port

app.listen(port,()=>{
    console.log('port running on port',port)
})