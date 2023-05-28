import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import mongoose from 'mongoose'
dotenv.config()
const PORT = process.env.PORT || 4000
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes)
app.get('/',(req,res)=>{
    res.send('Server is ready')
})


app.use(notFound);
app.use(errorHandler);


//connect to database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>console.log(`listening to port ${PORT}`))
})
.catch((error)=>{
    console.log(error);
})
