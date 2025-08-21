# Firestore Backend Deployment Guide

This guide will help you deploy your alumni portal backend on Google Cloud Firestore.

## Prerequisites

- Google Cloud account
- Firebase project created
- Node.js and npm installed
- Git installed

## Step 1: Set up Firebase Project

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select existing project
3. Enter project name (e.g., "alumni-portal")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Firestore Database
1. In Firebase Console, go to "Firestore Database" in left sidebar
2. Click "Create Database"
3. Choose security mode:
   - **For development**: Select "Start in test mode"
   - **For production**: Select "Start in locked mode"
4. Choose database location (select closest to your users)
5. Click "Done"

### 1.3 Enable Authentication
1. Go to "Authentication" in left sidebar
2. Click "Get started"
3. Enable sign-in methods:
   - Email/Password
   - Google
4. Click "Save"

## Step 2: Configure Firebase

### 2.1 Get Firebase Config
1. In Firebase Console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web app icon (</>)
5. Register app with nickname (e.g., "alumni-portal-web")
6. Copy the Firebase config object

### 2.2 Set Environment Variables
Create a `.env.local` file in your project root:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 3: Deploy Firestore Security Rules

### 3.1 Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 3.2 Login to Firebase
```bash
firebase login
```

### 3.3 Initialize Firebase in Project
```bash
firebase init
```

Select:
- Firestore
- Use existing project
- Select your Firebase project
- Use `firestore.rules` as rules file
- Use `firestore.indexes.json` as indexes file

### 3.4 Deploy Security Rules
```bash
firebase deploy --only firestore:rules
```

## Step 4: Seed Database with Initial Data

### 4.1 Run Seeding Script
```bash
# Make sure you're in the project root
cd scripts
node seed-firestore.js
```

**Note**: You may need to convert the script to CommonJS or set up ES modules. Alternative approach:

```bash
# Create a simple seeding script
npx tsx scripts/seed-firestore.js
```

### 4.2 Verify Data in Firebase Console
1. Go to Firestore Database in Firebase Console
2. Check that the "alumni" collection was created
3. Verify that sample alumni data is present

## Step 5: Configure Firestore Indexes

### 5.1 Create Composite Indexes
For better query performance, create these indexes in Firebase Console:

1. **Collection**: `alumni`
   - **Fields**: `batch` (Ascending), `name` (Ascending)
   - **Query scope**: Collection

2. **Collection**: `alumni`
   - **Fields**: `profession` (Ascending), `name` (Ascending)
   - **Query scope**: Collection

3. **Collection**: `events`
   - **Fields**: `date` (Descending), `title` (Ascending)
   - **Query scope**: Collection

4. **Collection**: `blog`
   - **Fields**: `publishedAt` (Descending), `title` (Ascending)
   - **Query scope**: Collection

### 5.2 Deploy Indexes
```bash
firebase deploy --only firestore:indexes
```

## Step 6: Production Deployment

### 6.1 Update Security Rules for Production
Update `firestore.rules` to be more restrictive:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Alumni collection - authenticated users can read, admins can write
    match /alumni/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Events collection - authenticated users can read, admins can write
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Blog posts - authenticated users can read, admins can write
    match /blog/{postId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 6.2 Deploy Updated Rules
```bash
firebase deploy --only firestore:rules
```

## Step 7: Monitoring and Maintenance

### 7.1 Set up Firebase Monitoring
1. In Firebase Console, go to "Project settings" > "Usage and billing"
2. Set up billing account (required for production)
3. Enable monitoring and alerting

### 7.2 Regular Backups
Set up automated backups:
1. Use Firebase Admin SDK to export data
2. Set up Cloud Functions for automated backups
3. Store backups in Google Cloud Storage

### 7.3 Performance Monitoring
1. Monitor Firestore usage in Firebase Console
2. Set up alerts for high read/write operations
3. Optimize queries based on usage patterns

## Step 8: Testing

### 8.1 Test Authentication
1. Test user registration and login
2. Verify Google OAuth integration
3. Test protected routes

### 8.2 Test Firestore Operations
1. Test CRUD operations on alumni data
2. Test search and filtering functionality
3. Verify real-time updates (if implemented)

### 8.3 Test Security Rules
1. Test unauthorized access attempts
2. Verify user permissions
3. Test admin-only operations

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check Firebase config in `.env.local`
   - Verify domain is added to authorized domains
   - Check if authentication methods are enabled

2. **Firestore Permission Errors**
   - Verify security rules are deployed
   - Check if user is authenticated
   - Verify collection names match rules

3. **Query Performance Issues**
   - Check if proper indexes are created
   - Optimize queries to use indexes
   - Monitor query execution time

4. **Data Not Loading**
   - Check browser console for errors
   - Verify Firestore rules allow read access
   - Check if data exists in Firestore

### Debug Commands

```bash
# Check Firebase project status
firebase projects:list

# View current project
firebase use

# Check Firestore rules
firebase firestore:rules:get

# View deployed indexes
firebase firestore:indexes:list

# Test security rules locally
firebase emulators:start --only firestore
```

## Cost Optimization

### 7.1 Monitor Usage
- Set up billing alerts
- Monitor read/write operations
- Track storage usage

### 7.2 Optimize Queries
- Use pagination for large datasets
- Implement caching strategies
- Minimize unnecessary reads

### 7.3 Choose Right Plan
- Start with Spark (free) plan
- Upgrade to Blaze (pay-as-you-go) for production
- Set up budget alerts

## Next Steps

1. **Implement Real-time Updates**: Use Firestore listeners for live data
2. **Add File Storage**: Integrate Firebase Storage for profile photos
3. **Set up Cloud Functions**: For server-side operations
4. **Implement Caching**: Use React Query or SWR for better performance
5. **Add Analytics**: Track user behavior and app performance

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Community](https://firebase.google.com/community)
- [Google Cloud Support](https://cloud.google.com/support)

---

**Note**: This guide assumes you're using Next.js with Firebase. Adjust the steps according to your specific setup and requirements.
