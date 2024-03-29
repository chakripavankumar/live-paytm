 const  mongoose= require('mongoose');

mongoose.connect("mongodb+srv://liveclass:Pavan%408096@cluster1.chs19ed.mongodb.net/paytm-liveclass")

const userScheme= new mongoose.Scheme({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        maxLength:6
    },
    fristname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        maxLength:50
    }
});
const accountScheme= new mongoose.Scheme({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true,
        
    }
});
const Account= mongoose.model('Account',accountScheme);
const User= mongoose.model("user",userScheme);

module.exports = {
    User,
    Account
}