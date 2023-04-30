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

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
// displaying the image"
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "welcome to the Blog App API" });
  });
}
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
