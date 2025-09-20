# Contact Form Testing Guide

## How to Test the Contact Form

1. Navigate to the contact section of your website
2. Fill out the form with:
   - Name: (at least 2 characters)
   - Email: (valid email format)
   - Message: (at least 10 characters)
3. Click "Send Message"
4. Observe the following:
   - Button should show "Sending..." with a spinner
   - Form should show "Submitting your message..." text
   - After submission, you should see a toast notification
   - On success: Green toast with "✅ Message sent! I'll respond within 24 hours."
   - On error: Red toast with appropriate error message

## Common Issues and Solutions

1. **Toast notifications not appearing**:
   - Check browser console for errors
   - Ensure the Sonner component is properly imported in App.tsx
   - Verify that both Toaster and Sonner components are included in App.tsx

2. **Form validation not working**:
   - Check browser console for JavaScript errors
   - Ensure all required fields are filled correctly

3. **Form submission failing**:
   - Check network tab in browser dev tools to see the request
   - Verify Formspree endpoint is correct
   - Ensure you have internet connectivity

## Manual Testing

If you want to manually test the toast notifications, you can temporarily add a test button to the ContactForm component:

```tsx
// Add this temporarily for testing
const testToast = () => {
  toast.success("Test success message");
  toast.error("Test error message");
};
```

And add a button in the JSX:
```tsx
<button onClick={testToast} className="mt-4 p-2 bg-blue-500 text-white rounded">
  Test Toast
</button>
```