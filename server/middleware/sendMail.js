import { createTransport } from "nodemailer";
import { GMAIL, GPASS } from "../config.js";

const sendMail = async (mail, subject, text) => {
  //config
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: GMAIL,
      pass: GPASS,
    },
  });
  //send mail
  await transporter.sendMail({
    from: GMAIL,
    to: mail,
    subject,
    text,
  });
};
export default sendMail;
