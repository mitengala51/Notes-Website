import express from "express";
import pg from "pg";
import cors from "cors";
import "dotenv/config";
import brcypt from 'bcrypt'

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect().then(() => {
  console.log("DataBase Connected");
});

const app = express();

app.use(express.json());
app.use(cors());

async function AllNotes() {
  const data = await db.query("SELECT * FROM notes");
  console.log(data.rows);
  return data.rows;
}

app.get("/All-Notes", async (req, res) => {
  const Notes = await AllNotes();
  res.json({ message: "ALL Notes Retrivied", Notes: Notes });
});

app.post("/Create-Notes", (req, res) => {
  const { title, note } = req.body;
  console.log(title, note);
  db.query("INSERT INTO notes(title, note) VALUES ($1,$2)", [title, note]);
  res.json({ message: "Notes Added Succesfully" });
});

app.put("/Update-Notes", (req, res) => {
  const { id, title, note } = req.body;
  console.log(id, title, note);
  db.query("UPDATE notes SET title=$1,note=$2 WHERE id=$3", [title, note, id]);
  res.json({ message: "Note Updated Successfully" });
});

app.delete("/Delete-Notes/:id", (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM notes WHERE id=$1", [id]);
    res.json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
});

//Login/SignUP API Endpoints

app.post("/signup", async (req,res)=>{
  const { username, password } = req.body
  console.log(username, password)
  const hashpassword = await brcypt.hash(password, 10)
  console.log(hashpassword)
  db.query("INSERT INTO users(username,password) VALUES($1, $2)", [username, hashpassword])
  res.status(200).json({message: "Account Registered Succesfully"})
})

app.post("/login", async (req,res)=>{
  const { username, Inputpassword } = req.body
  console.log(username,Inputpassword)
  if(!username){
    res.status(404).json({message: "Username Missing"})
  }
  const auth = await db.query("SELECT * from users WHERE username=$1",[username])
  const Hashedpassword = auth.rows[0].password
  brcypt.compare(Inputpassword, Hashedpassword, (error, result)=>{
    if(error){
      res.status(400).json({message: "Entered Wrong Password"})
    }

    if(result){
      res.status(200).json({message: "Logged In"})
    }
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on port ${process.env.PORT}`);
});
