const File = require("../models/File");

const localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;

    console.log(file);

    const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    console.log(path);

    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      success: true,
      message: "local file uploaded successfully",
    });
  } catch (error) {
    console.log("something went wrong while uploading the local file");
    console.log(error);
  }
};

module.exports = { localFileUpload };
