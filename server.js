import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import postRoutes from './routes/posts.js'

dotenv.config()
const port =process.env.PORT

const app = express();

app.use(express.json())

app.use('/api/posts', postRoutes)

const connectDB= async ()=>{
try {
    mongoose.set('strictQuery', true)

    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })

    console.log('DB connected');
} catch (error) {
    console.error(error.message);
    process.exit(1)
}
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`server started at ${port}`);
    })
    
}).catch(err => console.log(err))    

