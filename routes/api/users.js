const express = require('express')
const router = express.Router();
const uuid = require('uuid')

const UsersData = require('../../Users');

// GET ALLS USERS

router.get('/', (req, res) =>{
    res.status(201).json({data : UsersData});
})

// GET USERS BY ID

router.get('/:id', (req, res) => {
   const {id} = req.params
   const user = UsersData.some(user => user.id === parseInt(id))
   if(user){
       const dataUser = UsersData.filter(i => i.id === parseInt(id))
       res.status(201).json({data : dataUser});
   }else{
    res.status(401).json({message : "BAD REQUEST"})
   }

})

module.exports = router