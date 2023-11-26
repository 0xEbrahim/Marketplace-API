/* eslint-disable no-undef */
import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler'

const sendEmail = asyncHandler(async (data, _req, _res)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })

     const info = await transporter.sendMail({
        from: '"MarketPlace" <Company@gmail.com>', 
        to: data.to, 
        subject: data.subject, 
        text: data.text, 
        html: data.htm, 
      })
    
      console.log('Message sent: %s', info.messageId)
})

export { sendEmail }
