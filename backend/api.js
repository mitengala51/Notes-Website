import express from "express";
import pg from "pg";
import cors from "cors";
import "dotenv/config";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = new pg.Client({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  connectionString: process.env.DB_URL,

  ssl: {
    rejectUnauthorized: false, // required for Render, Railway, etc.
  }
});

const secretKey = process.env.JWT_SECRET_KEY;

db.connect().then(() => {
  console.log("DataBase Connected");
});

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["https://notes-website-frontend.onrender.com", "https://notes-website-jjj9.onrender.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false,
}));

// Current User id
var currentUserID;

// JWT MiddleWare

// function verifyToken(req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) {
//     res.status(404).json("Token not found Access denied");
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// }

// Function to retrive all Notes

async function AllNotes() {
  if(!currentUserID){
    console.log("CurrentUserId not found");
  }
  console.log(currentUserID)
  const data = await db.query("SELECT * FROM notes WHERE user_id=$1", [currentUserID]);
  console.log(data.rows);
  return data.rows;
}

// EndPoint to retrive all Notes

app.get("/All-Notes", async (req, res) => {
  try {
    const Notes = await AllNotes();
    res.json({ message: "ALL Notes Retrivied", Notes: Notes });
  } catch (error) {
    console.log(error);
  }
});

// EndPoint to create note

app.post("/Create-Notes", (req, res) => {
  try {
    const { title, note } = req.body;
    console.log(title, note);
    db.query("INSERT INTO notes(title, note, user_id) VALUES ($1,$2, $3)", [title, note, currentUserID]);
    res.json({ message: "Notes Added Succesfully" });
  } catch (error) {
    console.log(error);
  }
});

// EndPoint to Update Note

app.put("/Update-Notes", (req, res) => {
  try {
    const { id, title, note } = req.body;
    console.log(id, title, note);
    db.query("UPDATE notes SET title=$1,note=$2 WHERE note_id=$3", [
      title,
      note,
      id,
    ]);
    res.json({ message: "Note Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

// EndPoint to Delete Note

app.delete("/Delete-Notes/:id", (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    if(!id){
      return res.status(404).json({message: "note id not found"})
    }
    db.query("DELETE FROM notes WHERE note_id=$1", [id]);
    res.json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
});

//Login/SignUP API Endpoints

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const hashpassword = await brcypt.hash(password, 10);
    console.log(hashpassword);
    db.query("INSERT INTO users(username,password) VALUES($1, $2)", [
      username,
      hashpassword,
    ]);
    res.status(200).json({ message: "Account Registered Succesfully" });

    const auth = await db.query("SELECT * from users WHERE username=$1", [
      username,
    ]);
    console.log(auth)
    currentUserID = await auth.rows[0].id
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, Inputpassword } = req.body;
    console.log(username, Inputpassword);

    const auth = await db.query("SELECT * from users WHERE username=$1", [
      username,
    ]);

    if(auth.rows.length == 0){
      return res.status(405).json({message: "Username not found"})
    }

    const Hashedpassword = auth.rows[0].password;
    currentUserID = await auth.rows[0].id;
    console.log(auth);
    console.log(auth.rows[0]);
    console.log(auth.rows[0].id);
    console.log(currentUserID);
    const passwordMatch = await brcypt.compare(Inputpassword, Hashedpassword)

    if(passwordMatch){
      return res.status(200).json({message: "Logged In Successfully"});
    }else{
      return res.status(400).json({ message: "Entered Wrong Password" });
    }

  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on port ${process.env.PORT}`);
});
