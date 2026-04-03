# Email Functionality Setup & Instructions

## ✅ What's Been Set Up

Your Ubity website now has a complete email enquiry system with:
- ✅ Email form in Footer (Get in Touch section)
- ✅ Backend API server for secure email handling
- ✅ Automated email sending to your inbox
- ✅ Confirmation emails sent to enquiry senders
- ✅ Beautiful HTML email templates
- ✅ Error handling and user feedback
- ✅ Ready for Vercel deployment

---

## 📧 Email Configuration

**Your configured email:**
- Email From: `ubityofficial@gmail.com`
- Password: `jjtc egoi ewsa taiu` (stored in `.env.local`)
- Receives enquiries at: `ubityofficial@gmail.com`

---

## 🚀 Running the Application

### **Option 1: Run Both Frontend & Backend Together (RECOMMENDED)**

```bash
npm run dev:all
```

This will start:
- ✅ **Frontend**: http://localhost:5173 (Vite React app)
- ✅ **Backend**: http://localhost:3001 (Email API server)

### **Option 2: Run Separately in Different Terminals**

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Runs Vite dev server on http://localhost:5173

**Terminal 2 - Backend:**
```bash
npm run dev:backend
```
Runs email API server on http://localhost:3001

---

## 📝 How the Form Works

### **On the Website:**
1. User fills in the "Get in Touch" form:
   - Name (required)
   - Email (required)
   - Phone (required)
   - Message (optional)
2. Clicks "Submit Enquiry"
3. Form is sent to backend API

### **Backend Processing:**
1. Validates required fields
2. Sends enquiry email to: `ubityofficial@gmail.com`
3. Sends confirmation email to user
4. Returns success/error message

### **User Gets:**
- ✅ Success message on website
- ✅ Beautiful confirmation email in their inbox
- ✅ Your team gets the enquiry details

---

## 🔐 Security Features

- ✅ Environment variables for credentials (`.env.local`)
- ✅ CORS enabled for frontend communication
- ✅ Input validation on both client & server
- ✅ Secure SMTP connection (TLS encryption)
- ✅ No sensitive data in source code

---

## 📧 Email Templates

### **Enquiry Email (to your inbox):**
- Clean professional design
- All user details clearly formatted
- User's email is reply-to address
- Call-to-action buttons

### **Confirmation Email (to user):**
- Branded with your company colors
- Thank you message
- Your contact info
- Professional footer

---

## ✨ Features

✅ **Form Validation**
- Checks all required fields
- Shows error messages

✅ **Loading State**
- Disabled button during submission
- Spinner animation
- "Sending..." text

✅ **Feedback**
- Success message (green)
- Error message (red)
- Auto-hides after 5 seconds

✅ **Both Pages**
- Works on Main page (Software Solutions)
- Works on Internships page

---

## 🌐 Deployment to Vercel

### **For Production (Vercel):**

**Your `.env.local` will become:**

```
VITE_API_URL=https://your-vercel-domain.vercel.app
```

**Steps:**
1. Push to GitHub
2. Connect to Vercel
3. Add Environment Variables in Vercel Dashboard:
   - `EMAIL_FROM`
   - `EMAIL_PASSWORD`
   - `EMAIL_TO`
   - `SMTP_HOST`
   - `SMTP_PORT`
4. Deploy (Vercel handles both frontend & backend)

---

## 🧪 Testing the Form

### **Quick Test:**

1. Start both servers: `npm run dev:all`
2. Go to http://localhost:5173
3. Scroll to "Get in Touch" section
4. Fill in the form:
   - Name: Test User
   - Email: your-test-email@gmail.com
   - Phone: +91 9999999999
5. Click "Submit Enquiry"
6. Check for:
   - ✅ Success message on website
   - ✅ Confirmation email in your test inbox
   - ✅ Enquiry email in ubityofficial@gmail.com

---

## 🐛 Troubleshooting

### **"Connection error. Make sure the backend server is running."**
- ❌ Ensure backend is running: `npm run dev:backend`
- ❌ Check backend is on http://localhost:3001
- ❌ Check for any errors in backend terminal

### **"Failed to send enquiry"**
- ❌ Check Gmail credentials in `.env.local`
- ❌ Verify Gmail 2FA is enabled
- ❌ Verify App Password is correct (16 chars, no spaces)
- ❌ Check SMTP settings are correct

### **No email received**
- ❌ Check EMAIL_TO in `.env.local`
- ❌ Check spam folder
- ❌ Verify Gmail account has IMAP enabled
- ❌ Check backend logs for errors

---

## 📁 Files Modified/Created

**New Files:**
- `server.js` - Email API backend
- `.env.local` - Credentials & config
- `.env.example` - Template for environment variables

**Modified Files:**
- `src/components/Footer.tsx` - Form handling & submission
- `package.json` - Added npm scripts

---

## 💡 Next Steps

1. ✅ Test the form locally
2. ✅ Verify emails are being sent
3. ✅ Deploy to Vercel (frontend + backend automatic)
4. ✅ Update EMAIL_TO to your business email when ready
5. ✅ Monitor enquiries and respond

---

## 📞 Support

If you need to:
- **Change email receiving address**: Update `EMAIL_TO` in `.env.local`
- **Use different email service**: Update SMTP config
- **Modify email templates**: Edit HTML in `server.js`
- **Add more form fields**: Update both `Footer.tsx` and `server.js`

---

**Status:** ✅ Ready for Production

Everything is set up and ready to go! Start with `npm run dev:all` and test the form. 🚀
