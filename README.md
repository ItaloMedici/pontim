<div align="center">
  <img src="https://i.imgur.com/IZBsCgh.png" alt="Pontim Logo" width="250"/>
  
  # 🃏 Pontim - The Open-Source Scrum Poker Platform  
  
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Version](https://img.shields.io/github/v/release/ItaloMedici/pontim)](https://github.com/ItaloMedici/pontim/releases) [![Contributors](https://img.shields.io/github/contributors/ItaloMedici/pontim)](https://github.com/ItaloMedici/pontim/graphs/contributors) [![Issues](https://img.shields.io/github/issues/ItaloMedici/pontim)](https://github.com/ItaloMedici/pontim/issues)  

</div>

**Pontim** is an open-source, interactive Scrum Poker platform that helps agile teams estimate story points collaboratively and in real time. 🚀  
It offers an engaging and efficient way to vote on story complexity using **Fibonacci numbers**, with a unique interactive experience where players can grab attention using sounds. 🔊  

## ✨ Features  

✔️ **Live Voting** – Players can vote in real-time and see the average selection.  
✔️ **Interactive Notifications** – Grab teammates' attention with sound alerts.  
✔️ **Customizable Rooms** – Create rooms with different limits based on your plan.  
✔️ **Google OAuth Authentication** – Quick and easy login with Google.  
✔️ **Stripe Integration** – Subscription-based plans for premium features.  

## 🛠️ Tech Stack  

Pontim is built with modern technologies to ensure a seamless and scalable experience:  

| Tech                | Purpose                                        |
|---------------------|-----------------------------------------------|
| **Next.js**         | Frontend framework for server-side rendering |
| **React**           | UI library for interactive components        |
| **Prisma**          | ORM for PostgreSQL database                  |
| **PostgreSQL**      | Relational database for persistent storage   |
| **NextAuth**        | Authentication provider using Google OAuth   |
| **Stripe**          | Payment gateway for subscriptions            |
| **Docker**          | Containerization for deployment              |

## 🚀 Getting Started  

### 1 - **Clone the Repository**  
```sh
git clone https://github.com/ItaloMedici/pontim.git
cd pontim
```

### 2 - **Install Dependencies**  
```sh
npm install
```

### 3 - **Set Up Environment Variables**  
Create a `.env.exemple` file in the root folder and add the necessary variables:  
```ini
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
DATABASE_URL=your-db-url
...
```

### 4 - **Run the Project Locally**  
```sh
npm run dev
```
Visit `http://localhost:3000` to start using Pontim! 🎉  

---

## 🤝 Contributing  

We welcome contributions from the community! To contribute:  

1. **Fork the repository** and create a new branch.  
2. Implement your feature or fix.  
3. Submit a **Pull Request (PR)** with a detailed description.  

---

## 🐝 License  

Pontim is open-source and released under the **MIT License**. See [LICENSE](LICENSE) for details.  

---

## 📚 Learning Purpose  

This project is designed as a **learning experience** for building **SaaS applications**, working with **real-time interactions**, and implementing **scalable architectures**. Feel free to explore, contribute, and improve Pontim! 🚀  

---

👨‍💻 **Developed by:** [Ítalo Médici](https://github.com/ItaloMedici)  
🌟 **Star this project** if you find it useful! 🚀  
