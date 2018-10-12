const express = require('express');
const server = express();
const port = 3005;
const cors = require('cors');
const actionDb = require('data\helpers\actionModel.js')
const projectDb = require('data\helpers\projectModel.js')




server.use(cors());// connect to react
server.use(express.json());//use json data



// Action Requests


//get action
server.get('/api/actions',(req,res)=>{
  actionDb.get()
  .then(actions=>{
    console.log('Success',actions)
    res.status(200).json(actions)
  })
  .catch(err =>{
    res.send(err);
  })
})


//get by id
server.get('/api/actions/:id',(req,res)=>{
  actionDb.get(req.params.id)
  .then(action => {
    console.log('Success',action);
    res.status(200).json(action)
  })
  .catch(err =>{
    res.send(err)
  })
})


// Post Request
server.post('/api/actions',(req,res) =>{
  const{project_id,description,notes}= req.body;
  const newAction = {project_id,description,notes}
  console.log(newAction);
  res.send('Creating Action');
  actionDb.insert(newAction)
  .then(actions=>{
    console.log('Success',actions);
    res.send('Action Created')
  })
  .catch(err=>{
    res.send(err)
  })
})



// Project Requests


// server listening
server.listen(port,()=>{
  console.log(`===API Running on ${port}` )
})
