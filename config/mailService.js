const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

module.exports.sendingmail = async (props) =>{
const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ssureshoffl@gmail.com',
      pass: 'kpbf yzuz hiyy kole'
    }
  });
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false })
  const { to, subject, text} = props
  
  var mailOptions = {
    from: 'ssureshoffl@gmail.com',
    to: "suresh60228@gmail.com",
    subject: "Your OTP For Login",
    text: otp
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

