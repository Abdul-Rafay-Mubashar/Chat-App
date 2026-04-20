💬 Real-Time Chat Application (MERN Stack)
📌 Overview

A full-stack real-time chat application built using the MERN stack, enabling users to connect, communicate, and manage social interactions seamlessly. The system implements secure authentication, real-time messaging, and user relationship management with a scalable backend architecture.

🚀 Key Features

👤 Authentication System
Secure user signup and login with JWT-based authentication, password hashing using bcrypt, and session management.

💬 Real-Time Communication
Instant one-to-one messaging powered by WebSockets (Socket.io), including live message updates, typing indicators, and online/offline presence tracking.

👥 Friend Management System
Send, accept, and reject friend requests. Users can manage their friend list and initiate chats only with approved connections.

📡 Messaging System
Private chat with persistent message history stored in MongoDB, ensuring reliable real-time delivery and data consistency.

🛠️ Tech Stack

Frontend: React.js, HTML5, CSS3, JavaScript (ES6+)
Backend: Node.js, Express.js, Socket.io
Database: MongoDB
Authentication: JWT, bcrypt

⚡ Real-Time Events (Socket.io)

connection → User connects to server
send_message → Emit new message
receive_message → Deliver message in real time
typing → Typing indicator
online_status → User presence tracking

💡 Highlights

Designed and implemented real-time communication using WebSocket architecture
Built secure authentication and authorization workflows
Modeled social relationships and messaging schemas in MongoDB
Developed a responsive frontend with efficient state management

⭐ Summary

A feature-rich real-time chat platform demonstrating full-stack development, secure authentication, and scalable real-time communication using the MERN ecosystem.
