const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const configuration = new Configuration({
    organization: process.env.organization_String,
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

 // Create a simple express api that calls the function

 const app=express()
 app.use(bodyParser.json())
 app.use(cors())
 const port=3080
 app.post('/',async(req,res)=>{
    const{message}=req.body;
    console.log(message)
    console.log(message,"message")
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 200,
        temperature: 0.5,
      });
      console.log()
      res.json({
        //data: response.data
        message:response.data.choices[0].text,
      })
 });
 /*app.get('/models',async(req,res)=>{
    const response=await openai.listEngines();
    console.log(response.data.data)
    res.json({
      models:response.data.data
    })
});*/
 app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);

 });

