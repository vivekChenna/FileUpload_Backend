const mongoose = require("mongoose");
const { transporter } = require("../config/nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async (doc) => {
  console.log("printing doc", doc);

  const sendMail = await transporter.sendMail({
    from: "vivek chenna",
    to: doc.email,
    subject: "New file uploaded on cloudinary",
    html: `<h1>Hey Champ!</h1> <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
  });

  console.log(sendMail);
});

module.exports = mongoose.model("File", fileSchema);
