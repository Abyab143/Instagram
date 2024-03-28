import mongoose from "mongoose";

const comentSchema = new mongoose.Schema({
  userid:{
    type:String,
    required:true
  },
  postid:{
    type:String,
    required:true
  },
  coments:{
    type:String,
    required:true
  }
},{
  timestamps:true
})

export const Coment = mongoose.model("Coment",comentSchema)