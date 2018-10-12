const express = require('express');
const server = express();
const port = 3005;
const cors = require('cors');
const actionDb = require('./data/helpers/actionModel.js')
const projectDb = require('./data/helpers/projectModel.js')




server.use(cors());// connect to react
server.use(express.json());//use json data



// ====Action Requests====


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
  const{project_id,description,notes,completed} = req.body;
  const newAction = {project_id,description,notes,completed}
  console.log(newAction);
  res.send('Creating Action');
  actionDb.insert(newAction)
  .then(actions=>{
    console.log('Success',actions);

  })
  .catch(err=>{
    res.send(err)
  })
})

// delete Request
server.delete('/api/actions/:id',(req,res)=>{
  actionDb.remove(req.params.id)
  .then(action=> {
    console.log('Success',action)
    res.send('Action Successful Deleted')
  })
  .catch(err=>{res.send(err)})
})

//put Request
server.put('/api/actions/:id',(req,res)=>{
  const{project_id,description,notes,completed} = req.body;
  const newAction = {project_id,description,notes,completed}
  const id = req.params.id;
  actionDb.update(id,newAction)
  .then(action=>{
    console.log('Success',action);
    res.send(action)
  })
})


// Project Requests


// server listening
server.listen(port,()=>{
  console.log(`===API Running on ${port}` )
})
