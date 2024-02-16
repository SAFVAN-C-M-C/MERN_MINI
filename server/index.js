const express = require('express')
require("dotenv").config()
const cors=require("cors")
const cookieParser = require('cookie-parser')
const app = express()
const userRouter=require("./routes/userRoutes")
const adminRouter=require("./routes/adminRoutes")


app.set(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true,
}
))

app.use('/profileimages',express.static('public/assets'))
app.use("/",userRouter )
app.use('/admin',adminRouter)







const PORT=process.env.PORT||1234
require('./config/db').then(()=>{
    console.log("DB Connected");
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT} http://localhost:${PORT}/`);
    })
})
.catch((err)=>{
    console.log(err.message);
})