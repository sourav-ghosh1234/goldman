const contactContentRepo = require('contactus/repositories/contactcontent.repository');
const settingRepo = require('setting/repositories/setting.repository');

class contactController {
  constructor() { }


  async getContactContent(req, res) {
    try {
      let contactStaticText = await contactContentRepo.getAllByField({});
      if (contactStaticText) {
        return {
          status: 200,
          data: contactStaticText,
          message: 'Text fetched successfully.'
        }
      } else {
        return {
          status: 201,
          data: [],
          message: 'There are no data at this moment.'
        }
      }
    } catch (error) {
      return res.status(500).send({
        message: error.message
      });
    }
  }

  async contactSave(req, res) {
    try {
      let save = await contactRepo.formContactSave(req.body);
      
      let locals = {
        subject: save.subject,
        full_name: save.full_name,
        company: save.company,
        phone: save.phone,
        email: save.email,
        message: save.message,
        how_did_you_find: save.how_did_you_find,
      };

      const setting_data = await settingRepo.getAllByField({ "isDeleted": false });
      var settingObj = {};
      if (!_.isEmpty(setting_data)) {
        setting_data.forEach(function (element) {
          settingObj[element.setting_name.replace(/\s+/g, "_")] = element.setting_value;
        });
      }

      if (save) {
        var mailOptions = {
          from: `Admin<${settingObj.Contact_Email}>`,
          to: req.body.email,
          subject: "Contact Form Submitted",
          html: 'Hello ' + '<b>' + req.body.email + '</b>' + ',<br><br>Check your details: <span><b><br>'+
          'Subject:'+ locals.subject +'<br>'+
          'full_name:'+ locals.full_name +'<br>'+
          'company:'+ locals.company +'<br>'+
          'phone:'+ locals.phone +'<br>'+
          'email:'+ locals.email +'<br>'+
          'message:'+ locals.message +'<br>'+
          'how_did_you_find:'+ locals.how_did_you_find +'<br>'+
           '<br></b></span><br><br>Thank You'
        };
        var sendMail = await transporter.sendMail(mailOptions);
        if(sendMail){
          return { status: 200, data: save, message: `Form Submitted and Email Send Successfully.` };
        }
      }
      else {
        return { status: 201, data: [], message: `There are some problem at this moment.` };
      }
    }
    catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

}

module.exports = new contactController();