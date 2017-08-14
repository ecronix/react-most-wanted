
module.exports = {
  sendWelcomeEmail: (event, mailTransport, APP_NAME) => {
    const user = event.data; // The Firebase user.

    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.

    if(!email){
      return;
    }

    const mailOptions = {
      from: '"Tarik Huber" <huber.tarik@gmail.com>',
      to: email
    };

    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName?displayName:''}!, Welcome to ${APP_NAME}. I hope you enjoy the demo application. If you like it don't forget to star it :)`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New welcome email sent to:', email);
    });
  },
  sendByeEmail: (event, mailTransport, APP_NAME) => {
    const user = event.data;

    const email = user.email;
    const displayName = user.displayName;

    if(!email){
      return;
    }

    const mailOptions = {
      from: '"Tarik Huber" <huber.tarik@gmail.com>',
      to: email
    };

    mailOptions.subject = `Bye!`;
    mailOptions.text = `Hey ${displayName}!, We confirm that we have deleted your ${APP_NAME} account.`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('Account deletion confirmation email sent to:', email);
    });
  }

};
