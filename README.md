# 🚀 Automate Email Report + Subscription System (Backend)

This backend project allows you to:

- ✅ Create users
- ✅ Subscribe users to different plans (`basic`, `pro`, `premium`)
- ✅ Store and manage user subscriptions in MongoDB
- ✅ Update the user's plan automatically when subscribed
- ✅ Send email reports (optional)

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **dotenv** for environment variables
- **nodemailer** (if you're sending emails)
- **Postman** (for testing the APIs)

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/faizan-devs/automate-email-report.git

cd AUTOMATE-EMAIL-REPORT
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```.env
MONGO_URI=your_mongodb_connection_uri
EMAIL_USER=your_email@gmail.com    # Only if using email
EMAIL_PASS=your_email_app_password # Only if using email
```

### 4 Running the Server

```bash
npm run dev
```

### 5. For getting report through email

```bash
node src/scripts/dailyReport.js
```

---

## API Usage (via Postman)

### 1. Create a New User

POST: /api/users

```json
{
  "name": "Faizan",
  "email": "faizan@example.com"
}
```

### 2. Subscribe User to a Plan

POST: /api/subscriptions

```json
{
  "userId": "user_object_id_here",
  "plan": "pro"
}
```

---

## Future Ideas

Add GET /users/:id to fetch a user and their plan

Add GET /subscriptions to list all

Add subscription history and expiration tracking

Add cron job to email reports automatically

--- 

### 🤝 Contributing
Pull requests are welcome! Feel free to open issues or suggestions.

## License

This project is open-source and free to use.

```yaml
Let me know if you'd like:
  - This README in Hindi or dual language
  - Email report instructions added
  - Or a frontend integration guide
```
