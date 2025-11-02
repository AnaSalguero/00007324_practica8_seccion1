//ap.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import controllers from "./controller/controllers.js";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret"; // Use a strong, secure key in production

app.use(bodyParser.json());
app.use(cors());
 

// Middleware: Verify Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};


app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected data accessed", user: req.user });
});

app.get("/",controllers.dysplayHome)
app.post("/signin", controllers.loginUser)
app.get('/users', controllers.getUsers)
app.get('/users/:id', controllers.getUserById)
app.post('/users', controllers.createUser)
app.put('/users/:id', controllers.updateUser)
app.delete('/users/:id', controllers.deleteUser)


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));