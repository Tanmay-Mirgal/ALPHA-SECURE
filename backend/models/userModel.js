import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin',"delivery_person"],
        default:'user'
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    profilePicture:{
        type:String
    },

},{timestamps:true});

const User = mongoose.model('User',UserSchema);

export default User;