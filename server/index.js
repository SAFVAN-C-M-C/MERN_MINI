const express =require('express')
const app=express()
const connectToDb=require('./config/db')
require('dotenv').config()







app.use("/", require("./routes/userRoutes"))
// app.use("/admin", require("./routes/adminRoutes"))



const PORT=process.env.PORT||8000
connectToDb.then(()=>{
    console.log("DB Connected");
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT} http://localhost:${PORT}/`);
    })
})
.catch((err)=>{
    console.log(err.message);
})