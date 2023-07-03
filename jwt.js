const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.get('/api', (req, res)=>{
    res.status(200).json({
        message : "WELCOME TO API SERVICE HOME.."
    })
})

// TOKEN SIGN

app.post('/api/sign', (req, res)=>{
    const user = {
        id : 1,
        name : "joe",   
        email : "joe@user.com"
    }
    jwt.sign({user : user}, "secret credentials", (err, token) =>{
        res.status(200).json({
           token : token
        })
    })
})

// POST AND VERIFYTOKEN JWT 

app.post('/api/posts',verifyToken, (req, res)=>{
 
   jwt.verify(req.token, "secretKey", (err, authData) => {
    if(err){
      res.sendStatus(403)
    }else{
      res.status(200).json({
       message : "Post created successfuly",
       data : authData
      })          
    }
   })
})

function verifyToken(req, res, next) {
   const bearerHeader = req.hearers['authorization']
   if(typeof bearerHeader !== "undefined"){
      const bearerToken = bearerHeader.split(' ')[1]
      req.token = bearerToken
      next()
   }else{
    res.status(403).json({ message : "FORBIDEN"})
   }
}

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://0.0.0.0:27017/NODE_SIMPLEARN", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGO DB JWT");
    app.listen(port , ()=>{
        console.log(`SERVER RUN AT : ${port}`);
    })
  })
  .catch((error) => {
    console.log(`ERROR TO CONNECTED : ${error}`);
  });
