const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowerCase:true
    },
    password:{
        type:String,
        require:true
    },
    picture: {
        type: String,
        default: null,
    },
    signupMethod: {
        type: String,
        enum: ['manual', 'google'],
        default: 'manual',
    },
    devices: [
        {
            token: {
                type: String,
            },
            ip: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            },
    ],
},{ timestamps: true });

userSchema.pre('save' ,async function(next){
    const user =this;
    if(!user.isModified('password')) return next();
    try {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(user.password,salt);
        user.password=hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword=async function(userPassword){
    try {
        const isMatch=await bcrypt.compare(userPassword,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const User=mongoose.model('User',userSchema);
module.exports=User;