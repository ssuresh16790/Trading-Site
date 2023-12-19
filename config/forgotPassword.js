module.exports.forgotOtpMail = async (email, otp) =>{
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
  
      transporter.otpSendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return true;
    }