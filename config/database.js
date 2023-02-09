const mongoose = require('mongoose')


mongoose.set('strictQuery', true);

const connectToDatabase = ()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`Mongodb Connected with ${data.connection.name}`);
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectToDatabase