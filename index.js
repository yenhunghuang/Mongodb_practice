const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017/mydatabase";

// 连接到 MongoDB
mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// 定义一个简单的 Schema 和 Model
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    age: Number,
});

const User = mongoose.model("User", UserSchema);

// Middleware
app.use(express.json());

// 路由示例
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
