import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // @ts-ignore
  name: "mail.3alearningsolutions.com",
  host: "mail.3alearningsolutions.com",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@3alearningsolutions.com",
    pass: "Harshit@123",
  },
});

export const forgetPasswordMail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  try {
    const html = `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ProCommerce:   
 Password Reset</title>
    <style type="text/css">
        /* Basic styling */
        body {
            font-family: Arial, sans-serif;
            color: #0f172a;
            margin: 0;
            padding: 0;
            background-color: #020617;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
        }

        /* Headers */
        h1, h2, h3 {
            color: #020617;
            margin: 0 0 20px;
        }

        /* Links */
        a {
            color: #0f172a;
            text-decoration: none;
        }

        /* Button */
        .button {
            background-color: #0f172a;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            text-align: center;
            display: inline-block;
            margin-top: 20px;
        }

        /* Responsive adjustments */
        @media screen and (max-width: 600px) {
            .container {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ProCommerce</h1>
        <h2>Reset Your Password</h2>
        <p>Hi there,</p>
        <p>We received a request to reset your password for your ProCommerce account.</p>
        <p>To create a new password, please click on the button below. This link will expire in 24 hours for security purposes.</p>
        <a href="http://localhost:3000/${token}" class="button">Reset Password</a>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <p>Thanks,</p>
        <p>The ProCommerce Team</p>
    </div>
</body>
</html>`;
    const mailOptions = {
      from: `"ProCommerce" noreply@3alearningsolutions.com`,
      to: `${email}`,
      subject: `Forget Password - ProCommerce`,
      html,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Forget Password Mail Sent: ", mailResponse.messageId);
  } catch (error) {
    console.error("Forget Password Email Error: ", error);
    throw error; // Re-throw to propagate the error
  }
};
