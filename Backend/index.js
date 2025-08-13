import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { ConnectDB } from './configs/mongoDB.js';
import { Router } from './routes/contactRoute.js';
dotenv.config();
ConnectDB()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Portfolio backend is running!");
});

app.use("/api", Router)

app.use((req,res)=>{
   res.status(404).json({message: "404 not found"})
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`)
})