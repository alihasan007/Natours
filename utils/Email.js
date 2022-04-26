const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'syed ali hasan <syedalihasan10@gmail.com>';
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: '587',
        auth: {
          user: proces.env.SENDINBLUE_LOGIN,
          pass: process.env.SENDINBLUE_PASSWORD,
        },
      });
    }
    // return nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   auth: {
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });
    return nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: '587',
      auth: {
        user: proces.env.SENDINBLUE_LOGIN,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    // 1)render html based on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2)define mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    // 3 create transport
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'welcome to the natoures family');
  }
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token valid for 10 mins'
    );
  }
};
