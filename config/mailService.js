const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// module.exports.sendingmail = async () =>{
// const transporter =  nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'ssureshoffl@gmail.com',
//       pass: 'kpbf yzuz hiyy kole'
//     }
//   });

//   const otp = otpGenerator.generate(6, { digits:true, upperCase: false, specialChars: false, alphabets: false })

//   var mailOptions =  {
//     from: 'ssureshoffl@gmail.com',
//     to: "suresh60228@gmail.com",
//     subject: "Your OTP for Login",
//     text: otp
//   };
//   console.log(mailOptions);
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
//   return null;
// }

module.exports.sendOtpForLogin = async (email, otp) =>{
  console.log(email,otp);
  
  const transporter =  nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ssureshoffl@gmail.com',
        pass: 'kpbf yzuz hiyy kole'
      }
    });
  
    var mailOptions =  {
      from: 'ssureshoffl@gmail.com',
      to: email,
      subject: "Your OTP for Login",
      text: otp
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return true;
  }

