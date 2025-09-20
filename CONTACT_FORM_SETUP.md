# Contact Form Setup Guide

To make your contact form fully functional, follow these steps:

## 1. Set up Formspree

1. Go to [Formspree.io](https://formspree.io/) and sign up for a free account
2. Create a new form by clicking "Create Form"
3. Enter your email address where you want to receive messages
4. Formspree will provide you with a unique form endpoint that looks like:
   ```
   https://formspree.io/f/{form-id}
   ```

## 2. Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual information:
   ```
   # Formspree Configuration
   VITE_FORMSPREE_FORM_ID=your-actual-form-id-here
   
   # Social Media Links
   VITE_LINKEDIN_URL=https://linkedin.com/in/your-actual-profile
   VITE_GITHUB_URL=https://github.com/your-actual-username
   ```

## 3. Test the Form

1. Restart your development server if it's running
2. Navigate to the contact section of your website
3. Fill out the form with test data
4. Submit the form and check if you receive the email

## Alternative: Using EmailJS

If you prefer EmailJS over Formspree:

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an email template
3. Install the EmailJS SDK:
   ```bash
   npm install @emailjs/browser
   ```
4. Replace the form submission code in ContactForm.tsx with EmailJS integration:
   ```typescript
   import emailjs from '@emailjs/browser';
   
   const onSubmit = async (data: FormValues) => {
     setIsSubmitting(true);
     
     try {
       await emailjs.send(
         'YOUR_SERVICE_ID',
         'YOUR_TEMPLATE_ID',
         data,
         'YOUR_PUBLIC_KEY'
       );
       
       toast.success("✅ Message sent! I'll respond within 24 hours.");
       form.reset();
     } catch (error) {
       toast.error("Something went wrong. Please try again later.");
       console.error("Form submission error:", error);
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

## Troubleshooting

If you're not receiving emails:

1. Check your spam/junk folder
2. Verify that your Formspree account is verified (required for form submissions)
3. Ensure your environment variables are correctly set
4. Check the browser console for any error messages