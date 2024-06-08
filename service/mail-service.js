const nodeMailer = require('nodemailer')
const userService = require('./user-service')


class MailService{
    constructor(){
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async SendActivationMail(to, link, email){
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Activation link(Foreste.)',
                text: '',
                html: 
                    `
                        <div>
                            <h3 style="color: black";>Hello ${email}</h3>
                            <p style="color: #383738";>We are delighted to welcome you to our employee search service! Your registration has been successfully completed, and now you have access to our powerful tools for talent search and recruitment.</p>
                            <p style="color: #383738";>Our platform offers convenient features for searching, filtering, and viewing profiles of potential candidates, allowing you to quickly find suitable employees for your company. We also provide tools for managing vacancies, contacting candidates, and conducting interviews.</p>
                            <p style="color: #383738";>We aim to make the hiring process as simple and efficient as possible for you. We hope that our service will become a reliable partner in your talent search and help your company reach new heights.</p>
                            <p style="color: #383738";>Feel free to reach out to our support team if you have any questions or need assistance. We are ready to help you anytime.</p>
                            <p style="color: #383738";>Best regards,</p>
                            <p style="color: #383738";>Foreste. Team</p>
                            <h4 style="color: #284622";>To activate, click on the button</h4>
                            <button style="width: 150px; height: 45px; background-color: #72C761; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; font-size: 16px">
                                <a href="${link}" style="text-decoration: none; color: white;">Activate</a>
                            </button>
                        </div>
                    `
            });
            console.log("Activation email sent successfully!");
        } catch (error) {
            console.error("Error sending activation email:", error);
            throw error; 
        }
    }
}

module.exports = new MailService();
