# 💰 Finance Tracker

Personal finance web application designed to help users track their financial habits, build budget plans, and monitor savings in one place.

🛠️ **Project Status:**

This is a **personal pet project** built to practice robust frontend architecture, state management, and real-time database synchronization.

---

## 🚀 Live Demo

🔗 [View Live Project](https://finance-tracker-13d5b.web.app/finance-tracker)

---

## ✨ Features

- **Authentication & Profiles:** Email-based Sign Up and Login, plus user profile updates using Firebase.
- **Income & Expense Tracking:** Log, edit, and categorize daily financial transactions.
- **Smart Budget Planning:** Set up monthly spending plans per category to keep budgets on track and avoid overspending.
- **Overview & Statistics:** A comprehensive dashboard featuring visual breakdown charts for intuitive financial insights.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React
- **Routing:** React Router
- **Styling:** Styled Components (for scoped, dynamic, and theme-driven component styling)
- **Backend & Database:** Firebase (Authentication, Firestore Realtime Database)

---

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the repository:

```
git clone https://github.com/violettab21/finance-tracker.git
```

### 2. Install dependencies:

```
npm install
```

### 3. Create and Configure Firebase Project

To connect the app to your own database, follow these steps:

1. Go to the [Firebase Console](https://firebase.google.com/) and click **Add project**.
2. _(Optional)_ Enable or disable Google Analytics based on your preference, then click **Create project**.
3. Once the project is ready, click the **Web icon (`</>`)** on the Project Overview page to register a new web app. Give it a nickname.
4. Copy the `firebaseConfig` object containing your unique keys shown on the screen.
5. In the Firebase left sidebar, set up the services:
   - **Authentication:** Click _Get Started_, choose **Email/Password**, enable it, and save.
   - **Firestore Database:** Click _Create database_, choose your location, and start in **Test mode** (or configure your security rules).

### 4. Set up environment variables:

Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Start the development server:

```
npm dev
```

The app will run locally.

---
