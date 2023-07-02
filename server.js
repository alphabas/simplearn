const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3001

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/users',require('./routes/api/users'))

// FIRST GET
app.get('/',(req, res) => {
  console.log("THIS IS THE HOME PAGE AND THE FIRST GET ....");
  res.status(201).json({messaage : "HI WE ARE AT THE HOME PAGE"})
})

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://0.0.0.0:27017/NODE_SIMPLEARN", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGO DB");
    app.listen(port, () => {
      console.log(`THIS APP RUN ON PORT - ${port}`);
    });
  })
  .catch((error) => {
    console.log(`ERROR TO CONNECTED : ${error}`);
  });
