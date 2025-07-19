# Trinetra - Crime Reporting and Awareness Platform 🚨

## 📝 Project Overview

**Trinetra** is a full-stack crime reporting and awareness platform built for Indian citizens and police authorities.  
It enables users to report crimes, view crimes geographically on a live map, and receive real-time alerts from police departments.

The project was motivated by the need to:
- Bridge the gap between citizens and law enforcement in reporting crimes.
- Increase transparency and accessibility of crime data.
- Provide authorities with real-time tools to monitor and respond to criminal activities effectively.

---

## 🔗 Live Project and Demo

- 🌐 **Live Project:** [Visit Trinetra Here](https://benevolent-beignet-7e524e.netlify.app/)
- 🎥 **Demo Video:** [Watch demo video](https://drive.google.com/file/d/1ot_cXGC5AR2Nxke1T85EP63oby7rXjQu/view?usp=sharing)



---

## 🛠️ Tech Stack

- **Frontend:** React.js, Material UI, React Leaflet, Chart.js
- **Backend:** Node.js, Express.js
- **Real-time Communication:** Socket.IO
- **Database:** MongoDB
- **Cloud Services:** Cloudinary

---

## ⚙️ Backend Setup

1. Open your terminal and navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file inside the `backend` directory with the following environment variables:

    ```plaintext
    SECRET=your_secret_key
    MONGODB_URI=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

---

## 🎨 Frontend Setup

1. Open your terminal and navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

---

## 📢 Additional Notes
- Make sure MongoDB is running or your MongoDB Atlas database is properly configured.
- Ensure all credentials in the `.env` file are correctly set.
- Frontend runs by default on `http://localhost:3000/`.
- Backend server runs by default on `http://localhost:5000/`.

---

Made with ❤️ for a safer and smarter future.
