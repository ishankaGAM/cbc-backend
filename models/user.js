import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true,

    },
    lastName : {
        type : String,
        required : true,

    },
    password: {
        type: String,
        required: true, 
        minlength: 6,
    },   
    isBlocked : {
        type : Boolean,
        default : false,
    },
    type : {
        type : String,
        default : "customer"
    },
    profilePicture : {
        type : String,
        default : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
    }
  })
  
  const User = mongoose.model("users",userSchema)
  
export default User;