// import express from 'express'
// import mongoose from 'mongoose';
// import { Schema,model } from 'mongoose';
const express=require('express');
const mongoose=require('mongoose')
const app=express();
// app.use(express.json())
// let todo=[];

// app.post('/add',async(req,res)=>{
//     const{title,description}=req.body;
//     const newtodo={
//         id:todo.length+1,title,description
//     };
//     todo.push(newtodo);
//     console.log(todo);
//     res.status(201).json(newtodo);
// })

// app.get('/')

// //start server
// const port=3000;
// app.listen(port,()=>{
//     console.log("server is listening to port "+port);
// })

app.use(express.json())
let ser=[];
mongoose.connect('mongodb://localhost:27017/harvester-machine').then(() => {
   console.log("hello sanjai ")
}).catch((err) => {
   
});
// const db=async()=>{
//     try {
//         mongoose.connect('mongodb://localhost:27017/mern-app')
//    console.log('DB connected!')

//     } catch (error) {
//         console.log(error)

//     }
// }
// db()
const todoSchema=new  mongoose.Schema({
   name:{
       required:true,
       type:String
   },
   description:String,
   price:{
    required:true,
    type:String
   }

})
const todoModel=mongoose.model('Ser',todoSchema);
app.post('/Ser',async(req,res)=>{
       const{name,description,price}=req.body;
   //     const newtodo={
   //         id:todo.length+1,title,description
   //     };
   //     todo.push(newtodo);
   // console.log(todo);
   try{
    //    const newTodo=new todoModel({name,description,price});
    //    await newTodo.save();
   let product= await todoModel.create({name,description,price})
       res.status(201).json(product);
   }catch(error){
       console.log(error)
       res.status(500).json({message:error.message});
   }
 
})
app.get('/ser',async(req,res)=>{
   try{const products =await todoModel.find(); 
       res.status(200).json(products);}
       catch(error){
           console.log(error)
           res.status(500).json({message:error.message});
       }  
})
app.put("/ser/:id",async(req,res)=>{
   try{
       const{
        name,description,price}=req.body;
           const id=req.params.id;
           const updatedTodo=await todoModel.findByIdAndUpdate(
               id,{
                name,description,price
               },{new:true}
           )
           if(!updatedTodo){
               return res.status(404).json({message:"Todo not found"})
           }
           res.json(updatedTodo)
       }catch(error){
           console.log(error)
           res.status(500),json({message:error.message});
       }
   
})
app.delete('/ser/:id',async(req,res)=>{
   try{
       const id=req.params.id;
       await todoModel.findOneAndDelete(id);
       res.status(204).end();
           }
           catch(error){
               console.log(error)
               res.status(500).json({message:error.message});
           }
})
const port=3002;
app.listen(port,()=>{
   console.log("server is listening to port ",port);
})
