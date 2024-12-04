import nodemailer from "nodemailer" ;

export const sendMail = async (email, tempUser) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });


    console.log(tempUser.email);

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Activation Code",
      text: `Your activation code is: ${tempUser.passcode}`,
      html: `<p>Your activation code is: <strong>${tempUser.passcode}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    return (true);
  } catch (Error) {
    throw new Error;
  }
};
