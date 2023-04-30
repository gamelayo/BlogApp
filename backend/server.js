const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleWare/errorMiddleWare");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

//Connect to database
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Home Page localhost:5000
app.get("/", (req, res) => {
  res.status(201).json({ message: "welcome to blog app" });
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
// displaying the image"
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
