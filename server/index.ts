import express from 'express'

const app = express();

app.get("/", (req, res)=>{
   res.json({
    message: "runs from bun"
   }) 
})

app.listen(3000, ()=>{
    console.log("running on")
})