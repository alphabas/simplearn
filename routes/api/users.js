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
   const user = UsersData.some((user) => user.id === parseInt(id))
   if(user){
       const dataUser = UsersData.filter(i => i.id === parseInt(id))
       res.status(201).json({data : dataUser});
   }else{
    res.status(401).json({message : "BAD REQUEST"})
   }

})

// POST NEW USER 

router.post('/', (req, res) => {
    const newUser = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email
    }

    if(!req.body.name || !req.body.email){
        res.status(401).json({message : "ALL FIELD REQUIRES"})
    }
    UsersData.push(newUser)
    res.status(201).json({data : UsersData});
})

// UPDATE USER

router.put('/:id', (req, res) => {
    const {id} = req.params
    const found = UsersData.some((user) => user.id === parseInt(id));
    if(found){
        const userUpdate = req.body
        UsersData.forEach((user)=>{
            if(user.id === parseInt(id)){
                user.name === userUpdate.name ? userUpdate.name : user.name;
                user.email === userUpdate.email ? userUpdate.email : user.email
                res.status(201).json({message : "USER UPDATE", data : user})
            }
        })
    }
})


// DELETE USERS 

router.delete('/:id', (req, res) => {
    const {id} = req.params
    const found = UsersData.some((user) => user.id === parseInt(id))
    if(found){
        const users = UsersData.filter((element) => element.id !== parseInt(id))
        res.status(201).json({message : "USER DELETED ", data : users})
    }
    else{
        res.sendStatus(401);
    }

})



module.exports = router