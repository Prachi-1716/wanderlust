
# 🌍 Wanderlust - Travel Listing Web App

**Wanderlust** is a full-stack travel listing platform inspired by Airbnb. Built using Node.js, Express, and MongoDB, this web app allows users to explore, create, review, and manage listings from around the world.

---

## 🔥 Features

- 🏕️ CRUD operations on travel listings
- 🗺️ Leaflet for interactive maps and location display
- 📷 Image upload using Cloudinary and Multer
- 🧑‍💻 User authentication and session support (Passport.js)
- 🌟 Ratings & review system
- ⚠️ Flash messages and custom error handling
- 🧱 Modular MVC folder structure
- 🖼️ Responsive EJS templates with Bootstrap

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap, Custom CSS
- **Authentication:** Passport.js, express-session
- **Maps:** Leaflet.js
- **File Upload:** Cloudinary, Multer
- **Deployment:** (Mention Render, Vercel, or other if deployed)

---

## 🗂 Folder Structure

```
majorProject/
│
├── controllers/          # Route logic and helpers
├── models/               # Mongoose models (User, Listing, Review)
├── routes/               # Express route files
├── views/                # EJS templates
├── public/               # Static files (CSS, images)
├── utils/                # Custom utilities and error classes
├── cloudConfig.js        # Cloudinary config
├── middleware.js         # Authentication and validation middleware
├── index.js              # Entry point for the app
├── .env                  # Environment variables
├── package.json
└── README.md
```

---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file:
   ```env
   DB_URL=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   SECRET=your_session_secret
   ```

4. **Run the app**
   ```bash
   node index.js
   ```

5. **Visit** `http://localhost:3000`

---

## 💡 Credits

This project is built as part of the [Apna College] Sigma 5.0 course.

---
