import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, phone',
      });
    }

    // Prepare email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">New Enquiry from Website</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Submitted on ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Name:</strong>
            <p style="margin: 0; color: #666;">${name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Email:</strong>
            <p style="margin: 0; color: #666;">${email}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Phone:</strong>
            <p style="margin: 0; color: #666;">${phone}</p>
          </div>
          
          ${message ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Message:</strong>
            <p style="margin: 0; color: #666;">${message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0; font-size: 12px; color: #999;">This is an automated message from ubity.com</p>
          </div>
        </div>
      </div>
    `;

    // Send email to business
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Enquiry from ${name}`,
      html: htmlContent,
      replyTo: email,
    });

    // Send confirmation email to user
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">Thank You for Your Enquiry</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
          <p style="color: #333; margin: 0 0 20px 0;">Hi ${name},</p>
          
          <p style="color: #666; margin: 0 0 15px 0;">Thank you for reaching out to UBITY! We have received your enquiry and we appreciate your interest in our services.</p>
          
          <p style="color: #666; margin: 0 0 15px 0;">Our team will review your message and get back to you shortly. If you have any urgent questions, please feel free to contact us directly.</p>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0;">
            <p style="margin: 0; color: #333;"><strong>Your Details:</strong></p>
            <p style="margin: 5px 0; color: #666;">Name: ${name}</p>
            <p style="margin: 5px 0; color: #666;">Email: ${email}</p>
            <p style="margin: 5px 0; color: #666;">Phone: ${phone}</p>
          </div>
          
          <p style="color: #666; margin: 20px 0 0 0;">Best regards,<br/>The UBITY Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0; font-size: 12px; color: #999;">© 2024 UBITY. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank You for Your Enquiry - UBITY',
      html: confirmationHtml,
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry sent successfully!',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send enquiry',
    });
  }
}
