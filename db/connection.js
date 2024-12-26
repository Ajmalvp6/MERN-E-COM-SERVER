const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE).then(result=>{
    console.log('db connected successfully');
    
}).catch(error=>{
    console.log(`db not connected ${error}`);
    
})
