const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

const localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;

    console.log(file);

    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

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

const isFileTypeSupported = (fileType, supportedTypes) => {
  return supportedTypes.includes(fileType);
};

const uploadFileToCloudinary = async (file, folder, quality) => {
  /**
   whenever u try to upload any media on media server like cloudinary 
   then it does not get directly uploaded to cloudinary
   the data goes(uploads) from our local machine to our server on a temporary folder 
   then from temporary folder it goes to media server
   then it gets deleted from our server temporary folder
   * 
   */

  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }

  console.log("printing file.TempFilePath");
  console.log(file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
  // cloudinary.uploader.upload(file.tempFilePath, options) --> this function want argument as file.tempFilePath , and options is the folder in which we want to put our file
};

const imageUpload = async (req, res) => {
  try {
    // 1st data fetch
    // 2nd validation
    // the fileType which has been send is supported or not
    // if file is not supported then send a response back
    // if yes then upload it to cloudinary
    // save data in database
    // successful response

    const { name, email, tags } = req.body;
    console.log(name, email, tags);

    const file = req.files.imageFile;
    console.log(file);

    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("FileType: ", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file type not supported",
      });
    }

    // file format supported hai

    const response = await uploadFileToCloudinary(file, "Vivekchenna");

    console.log("printing response");
    console.log(response);
    // db me entry save karni hai

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "image successfully uploaded",
    });
  } catch (error) {
    console.log("something went wrong");
    return res.status(400).json({
      success: false,
      message: "something went wrong while uploading the file",
      err: { error },
    });
  }
};

const videoUpload = async (req, res) => {
  try {
    const { email, tags, name } = req.body;

    const file = req.files.videoFile;

    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1];

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file type not supported",
      });
    }

    // file type supported hai then

    const response = await uploadFileToCloudinary(file, "Vivekchenna");
    console.log(response);

    const videoData = await File.create({
      email,
      tags,
      name,
      imageUrl: response.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "successfully uploaded video",
    });
  } catch (error) {
    console.log("something went wrong not able to upload video");

    return res.status(400).json({
      message: "something went wrong not able to upload video",
      success: false,
      err: { error },
    });
  }
};

const imageSizeReducer = async (req, res) => {
  try {
    const { email, name, tags } = req.body;
    const file = req.files.imageFile;
    console.log(file);

    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("FileType: ", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file type not supported",
      });
    }

    // file format supported hai

    const response = await uploadFileToCloudinary(file, "Vivekchenna", 10);

    console.log("printing response");
    console.log(response);
    // db me entry save karni hai

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "image successfully uploaded",
    });
  } catch (error) {
    console.log("something went wrong");
    return res.status(400).json({
      success: false,
      message: "something went wrong while uploading the file",
      err: { error },
    });
  }
};

module.exports = {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageSizeReducer,
};
