const express = require('express')    //here we import express module
const path = require('path');     //we use path module to direct to the path of views folder
const fs = require("fs");   //fs module to read and write a file
const app = express();    //express is a app module that we are inserting here
const port = 80;      //here we choose an 80 port to show the website  its localhost we do not have to define port in website
const hostname = '127.0.0.1'      //here we define the local host if we not define that also ok

//eXPRESS SPECIFIC STUFF

app.use('/static', express.static('static'))    //for serving static file
app.use(express.urlencoded())  //this is a middle ware which help us to take a data from form and submit to express

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')       //set the template engin in pug
app.set('views',path.join(__dirname, 'views'))          //set the view directory   ---- also we have to import path module to get the access folder/html

//END POINT
app.get('/', (req, res)=>{
  const con = "hey this is title using the pug also we can send this content as variable in this app js express file"
  const param = {"title" : "hey this is title using the pug", "content": con}
  res.status(200).render('index.pug',param)
})
app.post('/',(req, res)=>{
  // console.log(req.body)
  let name = req.body.name
  let age = req.body.age
  let gender = req.body.gender
  let address = req.body.address
  let more = req.body.more

  let outputToWrite = `the name of the client is ${name}, ${age} years old, gender: ${gender}, residensing at ${address},More: ${more}`
  fs.writeFileSync('output.txt', outputToWrite)
  const param = {"message":"hey Your Form has been submitted successfully"}
  res.status(200).render('index.pug',param)
})


//START THE SERVER
app.listen(port,hostname, ()=>{
    console.log(`The application Listen on http://${hostname}:${port}/`)
})