const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/Db/config");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const opportunityRoutes = require("./src/routes/opportunityRoutes");
const submissionRoutes = require("./src/routes/submissionRoutes");
const cors = require("cors");
const path = require("path");
const notificationRoutes=require("./src/routes/notificationRoutes")

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/notifications", notificationRoutes);


app.use("/uploads", express.static("public/uploads"));

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
