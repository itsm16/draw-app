import express from 'express'

const app = express();

app.get("/", (req, res)=>{
   res.json({
    message: "runs from bun"
   }) 
})

app.get("/health-check", (req, res)=>{
    res.json({
    message: "health run"
   }) 
})

app.listen(3000, ()=>{
    console.log("running on")
})