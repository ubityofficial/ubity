import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email endpoint
app.post('/api/send-enquiry', async (req, res) => {
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
            <p style="margin: 0; color: #666;"><a href="mailto:${email}">${email}</a></p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Phone:</strong>
            <p style="margin: 0; color: #666;"><a href="tel:${phone}">${phone}</a></p>
          </div>
          
          ${message ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Message:</strong>
            <p style="margin: 0; color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0; color: #999; font-size: 12px;">This is an automated message from your website's contact form.</p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Enquiry: ${name}`,
      html: htmlContent,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message || 'No message provided'}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to client
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">Thank You for Your Enquiry!</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your request</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
          <p style="color: #333; margin: 0 0 20px 0;">Hi ${name},</p>
          
          <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for reaching out to UBITY! We've received your enquiry and will review it shortly.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
            Our team will get back to you within 24 hours at <strong>${email}</strong> or <strong>${phone}</strong>.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
            If you have any urgent questions, feel free to call us directly.
          </p>
          
          <div style="margin-top: 30px; padding: 20px; background: white; border-left: 4px solid #667eea; border-radius: 5px;">
            <p style="margin: 0 0 10px 0; color: #333; font-weight: bold;">UBITY Contact Info:</p>
            <p style="margin: 5px 0; color: #666;">Email: ubityofficial@gmail.com</p>
            <p style="margin: 5px 0; color: #666;">Phone: Available 24/7</p>
          </div>
          
          <p style="margin: 30px 0 0 0; color: #999; font-size: 12px;">Best regards,<br>UBITY Team</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'We Received Your Enquiry - UBITY',
      html: confirmationHtml,
      text: `Hi ${name},\n\nThank you for reaching out to UBITY! We've received your enquiry and will review it shortly.\n\nOur team will get back to you within 24 hours.\n\nBest regards,\nUBITY Team`,
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send enquiry. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Career application endpoint
app.post('/api/send-application', async (req, res) => {
  try {
    const { fullName, email, age, qualification, jobTitle, resumeBase64, resumeFileName } = req.body;

    // Validate required fields
    if (!fullName || !email || !age || !qualification || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Prepare email to admin (with resume as attachment)
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">New Job Application</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Submitted on ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Job Position:</strong>
            <p style="margin: 0; color: #666;">${jobTitle}</p>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Applicant Name:</strong>
            <p style="margin: 0; color: #666;">${fullName}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Email:</strong>
            <p style="margin: 0; color: #666;"><a href="mailto:${email}">${email}</a></p>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Age:</strong>
            <p style="margin: 0; color: #666;">${age}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Qualification:</strong>
            <p style="margin: 0; color: #666;">${qualification}</p>
          </div>

          <div style="margin-bottom: 20px; padding: 15px; background: #fff; border-left: 4px solid #667eea; border-radius: 3px;">
            <strong style="color: #333; display: block; margin-bottom: 5px;">Resume:</strong>
            <p style="margin: 0; color: #666;">Resume file attached: <strong>${resumeFileName || 'application_resume.pdf'}</strong></p>
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
      replyTo: email,
      subject: \`New Application for \${jobTitle} - \${fullName}\`,
      html: adminHtmlContent,
      text: \`Job Position: \${jobTitle}\\nApplicant: \${fullName}\\nEmail: \${email}\\nAge: \${age}\\nQualification: \${qualification}\\n\\nResume attached.\`,
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

    // Send confirmation email to applicant
    const confirmationHtml = \`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">Application Received!</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for applying to UBITY</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
          <p style="color: #333; margin: 0 0 20px 0;">Hi \${fullName},</p>
          
          <p style="color: #666; line-height: 1.6; margin: 0 0 15px 0;">
            Thank you for applying to the <strong>\${jobTitle}</strong> position at UBITY! We're excited to review your application.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin: 0 0 15px 0;">
            Our recruitment team will carefully review your profile and resume. We typically get back to candidates within 5-7 business days.
          </p>

          <div style="background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; border-radius: 3px;">
            <p style="margin: 0; color: #333; font-weight: bold;">Application Summary:</p>
            <p style="margin: 5px 0; color: #666;">Position: \${jobTitle}</p>
            <p style="margin: 5px 0; color: #666;">Submitted: \${new Date().toLocaleDateString()}</p>
            <p style="margin: 5px 0; color: #666;">Confirmation sent to: \${email}</p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin: 0 0 15px 0;">
            In the meantime, feel free to explore more about UBITY on our website or reach out if you have any questions.
          </p>

          <div style="margin: 25px 0; padding: 15px; background: white; border-left: 4px solid #667eea; border-radius: 3px;">
            <p style="margin: 0; color: #333;"><strong>Questions?</strong></p>
            <p style="margin: 5px 0; color: #666;">Email: ubityofficial@gmail.com</p>
            <p style="margin: 5px 0; color: #666;">Visit: www.ubity.com</p>
          </div>
          
          <p style="color: #666; margin: 20px 0 0 0;">Best regards,<br/><strong>The UBITY Team</strong></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0; font-size: 12px; color: #999;">© 2024 UBITY. All rights reserved.</p>
          </div>
        </div>
      </div>
    \`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: \`We Received Your Application - \${jobTitle} Position\`,
      html: confirmationHtml,
      text: \`Hi \${fullName},\\n\\nThank you for applying to the \${jobTitle} position at UBITY! We're excited to review your application.\\n\\nOur team will get back to you within 5-7 business days.\\n\\nBest regards,\\nUBITY Team\`,
    });

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Error processing application:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to process application',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email server is running' });
});

app.listen(PORT, () => {
  console.log(`✅ Email server running on http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: POST http://localhost:${PORT}/api/send-enquiry`);
});
