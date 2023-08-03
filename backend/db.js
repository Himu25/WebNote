const mongoose = require('mongoose');
mongoose.connect(process.env.HOST,{useNewUrlParser: true}
).then(()=>{
    console.log("Connected Sucessfully");
}).catch(()=>{
    console.log("No connection");
})

// username :   himanshu638684
// password :  1oEmcg1reMXVoBwV
//url : mongodb+srv://himanshu638684:1oEmcg1reMXVoBwV@cluster0.44wrne4.mongodb.net/WebNote