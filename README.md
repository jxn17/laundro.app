# 🧺 Laundro — Laundry Management SaaS

A **mobile-first SaaS web application** built to help small laundry businesses digitize their daily operations.
Instead of notebooks and manual calculations, Laundro provides a simple interface for managing orders, tracking revenue, and notifying customers.

Designed for **local laundry owners**, the system focuses on simplicity, speed, and minimal training.

---

# 🚀 Features

### 📱 Mobile-First Dashboard

* Clean merchant-style interface
* Revenue overview
* Order statistics
* Recent orders view

### 🧾 Order Management

Laundry owners can:

1. Create new customer orders
2. Add clothes/items to the order
3. Automatically calculate totals
4. Track order lifecycle

Order lifecycle:

```
WASHING → READY → PAID
```

---

### 📊 Reports System

A spreadsheet-style table showing:

* Room number
* Phone number
* Item count
* Order amount
* Order status

Actions available:

* Mark order **READY**
* **Notify customer via WhatsApp**
* Show **UPI payment QR**
* Mark **PAID**

---

### 📲 WhatsApp Notification

One-click WhatsApp messages:

* Notify when laundry is ready
* Notify all READY customers sequentially

---

### 💳 UPI Payment Integration

Laundry owners can display a dynamic **UPI QR code** for each order.

Customer scans → pays → owner marks order as **PAID**.

---

### 🌍 Multilingual Interface

Built with **i18next**.

Supported languages:

* English
* Hindi
* Kannada

Language is selected **once on first login** and stored in Firestore.

---

### 🔐 Authentication

Secure login using **Firebase Phone OTP Authentication**.

Each laundry owner has isolated data.

---

# 🏗 Architecture

### Frontend

* **React**
* **TypeScript**
* **Vite + SWC**

### Backend / Infrastructure

* **Firebase Authentication**
* **Cloud Firestore**

### Database Structure

```
users/{uid}
    businessName
    upiId
    phone
    preferredLanguage
    createdAt

users/{uid}/orders/{orderId}
    customer:
        roomNumber
        phone
    items[]
    total
    status
    createdAt
```

This enables **multi-tenant SaaS isolation**.

---

# 📂 Project Structure

```
src
│
├── components
│   ├── Button.tsx
│   ├── QuantitySelector.tsx
│   └── UpiQr.tsx
│
├── hooks
│   └── useCart.ts
│
├── i18n
│   ├── en.json
│   ├── hi.json
│   ├── kn.json
│   └── index.ts
│
├── layout
│   └── BottomNav.tsx
│
├── screens
│   ├── Dashboard.tsx
│   ├── Reports.tsx
│   ├── Settings.tsx
│   ├── CreateOrder.tsx
│   ├── ClothesCart.tsx
│   ├── OrderSummary.tsx
│   └── OrderFlow.tsx
│
├── services
│   ├── firebase.ts
│   ├── orderService.ts
│   ├── userService.ts
│   └── whatsapp.ts
│
└── types
    └── order.ts
```

---

# 🔄 Order Flow

```
Dashboard
   ↓
Floating + Button
   ↓
Create Order (Customer Info)
   ↓
Add Clothes
   ↓
Order Summary
   ↓
Save to Firestore
   ↓
Redirect to Reports
```

---

# 🧠 Key Design Goals

* Minimal learning curve for laundry owners
* Fast order entry
* Mobile-first UX
* Multi-language support
* SaaS-ready architecture

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/laundro.git
cd laundro
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

# 🔧 Environment Setup

Create a `.env` file and add Firebase configuration:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

# 📈 Future Improvements

* Automated WhatsApp messaging API
* Stripe / Razorpay payment integration
* Analytics dashboard
* Multi-shop management
* Customer pickup scheduling
* Native mobile app

---

# 👨‍💻 Author

Built by **Srijan Bera**
Computer Science (AI & ML)
Manipal Institute of Technology

---

# 📜 License

MIT License
