# 💬 Real-Time Chat Application

### MERN Stack Real-Time Messaging System

---

## 📌 Overview

This is a **full-stack real-time chat application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with **Socket.io** for live communication.

The system enables users to connect, manage friendships, and exchange messages in real time with secure authentication and persistent chat history.

---

## 🧠 Core Concept

* Real-time messaging using WebSockets (Socket.io)
* Secure user authentication with JWT
* Friendship-based communication system
* Persistent message storage in MongoDB
* Live user presence tracking (online/offline)

---

## 💬 System Flow

1. User signs up / logs in
2. Authentication verified using JWT
3. Users send friend requests
4. After acceptance, chat connection is enabled
5. Real-time messages exchanged via Socket.io
6. Messages stored in database for history

---

## ⚡ Real-Time Events (Socket.io)

* `connection` → User connects to server
* `send_message` → Send new message
* `receive_message` → Deliver message instantly
* `typing` → Typing indicator
* `online_status` → User presence tracking

---

## 🧩 Key Features

### 👤 Authentication

* Secure signup/login
* Password hashing (bcrypt)
* JWT-based session management

---

### 💬 Messaging System

* One-to-one real-time chat
* Instant message delivery
* Persistent chat history

---

### 👥 Friend System

* Send / accept / reject requests
* Chat only with accepted friends
* Manage friend list

---

### 📡 Real-Time Communication

* WebSocket-based messaging
* Typing indicators
* Online/offline status

---

## ⚙️ Architecture

```id="il2a4g"
Frontend (React)
   ↓
Backend (Node + Express)
   ↓
Socket.io Server (Real-Time Layer)
   ↓
MongoDB (Users + Messages + Friends)
```

---

## 🚀 Tech Stack

* React.js
* Node.js
* Express.js
* MongoDB
* Socket.io
* JWT + bcrypt

---

## 💡 Highlights

* Real-time WebSocket architecture
* Secure authentication system
* Friend-based communication model
* Persistent messaging system
* Scalable MERN structure

---

## 📌 Summary

This project demonstrates a **real-time social communication system** built on the MERN stack, focusing on **secure authentication, WebSocket communication, and scalable chat architecture**.

---
