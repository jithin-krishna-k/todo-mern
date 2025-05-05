# TODO-MERN

A full-stack To-Do List application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. This app allows users to manage their tasks efficiently with features like adding, editing, deleting, and filtering tasks.

live link : https://todo-mern-client-psi.vercel.app/

---

## Features

- Add new tasks
- Edit or delete existing tasks
- Filter tasks based on status
- Responsive modern UI (Tailwind CSS)

---

## Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  
- Axios

**Backend**  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- dotenv

---

## Installation

```bash
1. Clone the repository
git clone https://github.com/jithin-krishna-k/todo-mern.git
cd todo-mern

```
```bash
2. Setup Backend
cd backend
npm install
npm run dev
Make sure you have MongoDB running locally or update the .env file with your MongoDB URI.
.env example:
PORT=3000
MONGO_URI=mongodb://localhost:27017/tododb
```
```bash
3. Setup Frontend
cd frontend
npm install
npm start

# frontend/.env
VITE_API_URL=http://localhost:3000/api

```
