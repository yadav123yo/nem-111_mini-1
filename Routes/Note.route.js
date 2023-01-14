const express=require("express")
const { NoteModel } = require("../model/Note.model")

const noteRoute=express.Router()

noteRoute.get("/", async (req,res)=>{
    let queryData=req.query
    try{
        const notes=await NoteModel.find(queryData)
        res.send(notes)
    }catch(err){
        console.log(err)
        console.log({"error":"error something went wrong"})
    }
})


noteRoute.post("/create", async (req,res)=>{

    let data=req.body
    try{
        // for adding data in DB
        const new_note=new NoteModel(data)
        await new_note.save()
        console.log(new_note)
        res.send("added the new_note succesful")

    }catch(err){
        console.log(err)
        res.send({"error":"error is coming while posting"})

    }
    
})




noteRoute.patch("/update/:id" ,async (req,res)=>{
     const ID=req.params.id
     const payload=req.body

     const note=await NoteModel.findOne({_id:ID})
     console.log(note,"note user id");
     const userID_in_note=note.userID
     const userID_making_req=req.body.userID

    try{
        if(userID_making_req !== userID_in_note){
            res.send({"MSg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:ID},payload)
            res.send(`update the note whose data id is ${ID}`)

        }

    }catch(err){
        console.log(err)
        res.send({"error":"error is coming when Patch"})

    }
})

noteRoute.delete("/delete/:id" ,async (req,res)=>{
    const ID=req.params.id
  
     const note=await NoteModel.findOne({"_id":ID})
     console.log(note);
     const userID_in_note=note.userID
     const userID_making_req=req.body.userID

    try{
        if(userID_making_req !== userID_in_note){
            res.send({"MSg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({"_id":ID})
            res.send(`delete the note whose data id is ${ID}`)

        }

    }catch(err){
        console.log(err)
        res.send({"error":"error is coming when deleting"})

    }
})

module.exports={
    noteRoute
}
