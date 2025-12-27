# MERN Stack Authentication System

This is a **complete Sign-Up and Login system** built using the **MERN stack** (MongoDB, Express, React, Node.js) with secure authentication, email verification, and password reset functionality.

---

## Features

### Welcome Page
- Users first see a welcome page.
- Options: **Get Started** or **Login**.

### Sign Up Flow
- Users can create an account with **Name, Email, and Password**.
- **Email Verification** using OTP sent via **Nodemailer**.
- Welcome email sent after successful signup.
- After verification, users get access to the **home page**.
- Navigation link: "Already have an account? Login"

### Login Flow
- Users login with **Email and Password**.
- Navigation link: "Don’t have an account? Sign Up"

### Password Reset
- Users can reset their password via **Forget Password**.
- OTP verification sent to registered email.
- Users can set a **new password** after verification.

### Security
- Passwords are hashed with **bcrypt**.
- Authentication handled with **JWT tokens**.

### Frontend Features
- **React** for UI
- **Axios** for API requests
- **Tailwind CSS** for styling
- **React Input Field** for OTP input
- **Data AOS** for animations

### Email Handling
- **Nodemailer** is used to send welcome emails and OTP verification emails.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, Data-AOS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT, Bcrypt  
- **Email Service**: Nodemailer  

---

## Screens / Flow

1. **Welcome Page** → Click **Get Started/Login** → Goes to Signup/Login page  
2. **Sign Up** → Enter Name, Email, Password → OTP email verification → Access home page  
3. **Login** → Enter Email, Password → Access home page  
4. **Forgot Password** → Enter Email → OTP verification → Reset password  
