

const transporter=require("./email.config")

 const sendEmail = async (email, verificationCode) => {
    try {
        const info = await transporter.sendMail({
            from: '"neuron markets" <salmanahmed7866@gmail.com>',
            to: email,
            subject: "Hello ✔",
            text: verificationCode, // Plain-text version of the message
            html: verificationCode, // HTML version of the message
        });

        console.log("Message sent:", info);
    } catch (e) {
        console.log("Error:", e);
    }
}
module.exports=sendEmail;