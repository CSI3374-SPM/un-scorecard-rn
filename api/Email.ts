const nodemailer = require("nodemailer");

const user = process.env.SMTP_USERNAME;
const pass = process.env.STMP_PASSWORD;
const gmailConfig = {
  host: "smtp.googlemail.com",
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
};
const transporter = nodemailer.createTransport(gmailConfig);

export const sendEmails = async (emails: string[], body: string) => {
  const info = await transporter.sendMail({
    from: '"UN Scorecard" <info@unscorecard.baylor.edu>',
    to: emails.join(", "),
    subject: "UN Scorecard Survey Data",
    text: body,
    // html: "This email is sent through <b>GMAIL SMTP SERVER</b>", // html body
  });
  console.group(info);
};
