const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default

const app = express();
const PORT = 5000;

let redisClient = redis.createClient({
    url: 'redis://redis:6379'
})

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient
});

app.use(express.json());
app.enable('trust proxy');
app.use(session({
    store: redisStore,
    secret: "SECRET",
    cookie: {
        resave:false,
        saveUninitialized:false,
        secure:false,
        httpOnly:true,
        maxAge: 300000
    }
}))

app.use('/api/user',require('./routes/userRoute'));
app.use('/api/blog',require('./routes/blogRoute'));

//const MONGO_URI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_USERNAME}@mongo:27017/?authSource=admin`


const connectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb://avoy:avoy1234@mongo:27017/?authSource=admin");
        // here mongo refers to the container name mongo which we gave in docker compose file while defining it
        // const conn = await mongoose.connect(MONGO_URI);
        // const conn = await mongoose.connect(${MONGO_URI});
        // console.log('Success');
        console.log('Success');
    } catch (error) {
        console.log(error)
    }
}

//connecting to the database
connectDB();


app.get('/api' , (req,res) => {
    res.send('Hello from Server')
    console.log('Server ran')
})

app.listen(PORT,() => console.log( `Server is running on port ${PORT}`))