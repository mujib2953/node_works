const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

// --- connecting to DB
connectDB();

// --- init middlewares
app.use(express.json({ extended: false }));

// --- Defining all the routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// --- serve static assets in production
if (process.env.NODE_ENV === "production") {
    // --- set static folder
    app.use(express.static("client/build"));

    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () =>{
    console.log(`Server started on ${PORT} port.`);
});