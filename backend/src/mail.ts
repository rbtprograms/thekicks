import * as nodeMailer from "nodemailer";
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

export const transport = nodeMailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

export const makeANiceEmail = text => `
<div className="email">
  <h2>hi</h2>
  <p>${text}</p>
</div>
`;
