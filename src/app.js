const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

// const authRoutes = require("./modules/auth/auth.routes");
const personRoutes = require("./modules/person/person.routes");
const taskRoutes = require("./modules/task/task.routes");
const shiftRoutes = require("./modules/shift/shift.routes");
const assignmentRoutes = require("./modules/assignments/assignments.routes");

app.use(cors());
// app.use("/api/auth", authRoutes);
app.use("/api/person", personRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/assignments", assignmentRoutes);



app.get("/test", (req, res) => {
    res.send("Working");
});


module.exports = app;


