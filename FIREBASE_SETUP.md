# Firebase Authentication Setup Guide

## 🚀 **Step 1: Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "alumni-portal")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## 🔑 **Step 2: Enable Authentication**

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click "Enable" and save
   - **Google**: Click "Enable", add your support email, and save

## ⚙️ **Step 3: Get Configuration**

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "alumni-portal-web")
6. Copy the configuration object

## 📝 **Step 4: Environment Variables**

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🔒 **Step 5: Security Rules (Optional)**

If you plan to use Firestore or Storage later, configure security rules in the Firebase Console.

## ✅ **Step 6: Test Authentication**

1. Start your development server: `npm run dev`
2. Navigate to `/signup` to create an account
3. Navigate to `/login` to sign in
4. Check `/dashboard` to see the authenticated user

## 🎯 **Features Included**

- ✅ Email/Password authentication
- ✅ Google OAuth authentication
- ✅ User state management
- ✅ Protected routes
- ✅ Responsive UI with Tailwind CSS
- ✅ Form validation and error handling
- ✅ Loading states and user feedback

## 🚨 **Important Notes**

- Never commit your `.env.local` file to version control
- The `NEXT_PUBLIC_` prefix is required for client-side access
- Firebase configuration is safe to expose in client-side code
- For production, consider additional security measures

## 🆘 **Troubleshooting**

- **"Firebase: Error (auth/invalid-api-key)"**: Check your API key in `.env.local`
- **"Firebase: Error (auth/operation-not-allowed)"**: Enable the authentication method in Firebase Console
- **"Firebase: Error (auth/network-request-failed)"**: Check your internet connection and Firebase project status
