const express = require("express");
const app = express();
const { PORT, connectWithDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileupload = require("express-fileupload");
const FileRoutes = require("./routes/FileRoutes");

app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/upload", FileRoutes);

app.listen(PORT, () => {
  console.log(`Server started successfully on ${PORT}`);
  connectWithDB();
  cloudinaryConnect();
});
