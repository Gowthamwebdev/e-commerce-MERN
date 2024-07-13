import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
     },
     price:{
        type:Number,
        required:true
     },
     stock:{
        type:Number,
        default:0
     },
     image:{
        type: String,
        required: true
     },     
     createdAt:{
        type: Date,
        default: Date.now()
     }
    
});

export const Product = mongoose.model('Product',Schema);