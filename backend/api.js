import express from 'express'
import pg from 'pg'
import cors from 'cors'

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Notes-Website",
    password: "password",
    port: "5432"
});

db.connect().then(()=>{console.log("DataBase Connected")})

const app = express()

app.use(express.json())
app.use(cors())

async function AllNotes(){
    const data = await db.query("SELECT * FROM notes")
    console.log(data.rows)
    return data.rows
}

app.get("/All-Notes", async (req, res)=>{
    const Notes = await AllNotes()
    res.json({message: "ALL Notes Retrivied", Notes: Notes})
});

app.post("/Create-Notes", (req,res)=>{
    const { title, note } = req.body
    console.log(title,note) 
    db.query("INSERT INTO notes(title, note) VALUES ($1,$2)", [title, note])
    res.json({message: "Notes Added Succesfully"})
});

app.put("/Update-Notes", (req,res)=>{
    const { id,title, note } = req.body
    console.log(id,title,note)
    db.query("UPDATE notes SET title=$1,note=$2 WHERE id=$3", [title, note,id])
    res.json({message: "Note Updated Successfully"})
});

app.delete("/Delete-Notes", (req,res)=>{
    const { id } = req.body
    console.log(id)
    db.query("DELETE FROM notes WHERE id=$1", [id])
    res.json({message: "Note Deleted Successfully"})
});

app.listen(3000, ()=>{
    console.log("Server is Listening on port 4000")
})