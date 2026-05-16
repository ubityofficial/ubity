import nodemailer from 'nodemailer';

// Validate environment variables
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'EMAIL_FROM', 'EMAIL_PASSWORD', 'EMAIL_TO'];
const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);

let transporter;

try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
} catch (err) {
  console.error('Failed to create transporter:', err);
}

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
    // Check if environment variables are set
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return res.status(500).json({
        success: false,
        message: `Missing environment variables: ${missingEnvVars.join(', ')}. Please configure these in Vercel project settings.`,
      });
    }

    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please check environment variables.',
      });
    }

    const { resumeBase64, resumeFileName } = req.body;

    // Validate required fields
    if (!resumeBase64 || !resumeFileName) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required',
      });
    }

    // Prepare email to admin (with resume as attachment)
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">New Profile Submission</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Submitted on ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
          <div style="margin-bottom: 20px; padding: 15px; background: #fff; border-left: 4px solid #667eea; border-radius: 3px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Resume Submitted:</strong>
            <p style="margin: 0; color: #666;"><strong>${resumeFileName || 'resume.pdf'}</strong></p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Next Steps:</strong>
            <p style="margin: 0; color: #666;">We will review the submitted resume and reach out within 24-48 hours if there's a great fit for any of our open positions.</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0; color: #999; font-size: 12px;">This is an automated message from UBITY's careers portal.</p>
          </div>
        </div>
      </div>
    `;

    // Build email options with attachment
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Profile Submission - ${resumeFileName}`,
      html: adminHtmlContent,
      text: `New profile submission received. Resume: ${resumeFileName}. We will review and reach out within 24-48 hours.`,
      attachments: [],
    };

    // Add resume as attachment if provided
    if (resumeBase64 && resumeFileName) {
      try {
        const buffer = Buffer.from(resumeBase64.split(',')[1] || resumeBase64, 'base64');
        mailOptions.attachments.push({
          filename: resumeFileName,
          content: buffer,
        });
      } catch (attachmentError) {
        console.error('Error processing attachment:', attachmentError);
        // Continue without attachment
      }
    }

    // Send email to admin
    await transporter.sendMail(mailOptions);

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Profile submitted successfully. We will review your resume and reach out within 24-48 hours.',
    });
  } catch (error) {
    console.error('Error submitting profile:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit profile. Please try again later.',
    });
  }
}
