const contactUsRepo = require('contactus/repositories/contactus.repository');
const settingRepo = require('setting/repositories/setting.repository');

class ContactUsController {
    constructor() {}

    /* @Method: list
    // @Description: Content Achieve list
    */
    async save(req, res) {
        try {
            let setting = await settingRepo.getByField({ 'setting_slug': 'site-email' });
            let contactSave = await contactUsRepo.save(req.body);
            if (contactSave) {
                let mailOptions = {
                    from: `Admin<${process.env.MAIL_USERNAME}>`,
                    to: setting.setting_value,
                    subject: 'Contact Us | Goldman Prestige',
                    html: `Hello Admin,<br>
                    <p>Contact details.</p>
                    <p>Name: ${contactSave.name}</p>
                    <p>Email: ${contactSave.email}</p>
                    <p>Phone: ${contactSave.phone}</p>
                    <p>Message: ${contactSave.message}</p><br><br>
                    Thanks & Regards,<br>
                    Techtribes`
                };
                let sendEmail = await transporter.sendMail(mailOptions);
                if (sendEmail) {
                    let mailOptionsForUser = {
                        from: `Admin<${process.env.MAIL_USERNAME}>`,
                        to: req.body.email,
                        subject: 'Contact Us | Goldman Prestige',
                        html: `Hello ${req.body.name},<br>
                        <p>Thank you for contact us. We will get in touch with you soon.</p><br>
                        Thanks & Regards,<br>
                        Goldman Prestige`
                    };
                    let sendEmailForUser = await transporter.sendMail(mailOptionsForUser);
                    if(sendEmailForUser){
                        return { status: 200, data: contactSave, "message": 'Thank you for contacting us.' };
                    }
                    
                }
            } else {
                return { status: 200, data: {}, "message": 'Contact Not Saved.' };
            }

        } catch (error) {
            return { status: 500, "message": error.message };
        }
    }
}

module.exports = new ContactUsController();