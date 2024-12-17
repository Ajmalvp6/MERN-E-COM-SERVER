require('dotenv').config()
const express = require('express')
const app = express()

// connect with frontend

const cors = require('cors')
const adminRouter = require('./routers/adminRouter')
const userRouter = require('./routers/userRouter')

require('./db/connection')

app.use(cors())





// convert all incoming data

app.use(express.json())


app.use(adminRouter)
app.use(userRouter)


// export upload folder to client app

app.use('/uploads',express.static('./uploads'))

// port

const PORT = 8001 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running successfully on ${PORT}`);
    
    
    
})


