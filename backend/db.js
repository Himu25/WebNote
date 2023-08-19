const mongoose = require('mongoose');
mongoose.connect(process.env.HOST,{useNewUrlParser: true}
).then(()=>{
    console.log("Connected Sucessfully");
}).catch(()=>{
    console.log("No connection");
})
