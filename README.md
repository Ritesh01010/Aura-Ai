# **Aura AI – Next-Gen Fitness Intelligence**

Aura AI is a next-generation fitness platform that blends computer vision, biomechanics, and artificial intelligence to guide users toward smarter, safer, and more enjoyable workouts. With real-time form correction, automatic rep counting, and gameified progression, it turns ordinary exercise into a personal training experience—right in your browser.

---

## 🚀 **Features**

### **Real-Time Pose Detection**

* Powered by **TensorFlow.js** and **MoveNet**
* Ultra-fast skeletal tracking in the browser
* Zero backend video processing and no privacy compromise

### **AI-Driven Form Correction**

* Instant visual cues
* Smart textual feedback
* Detects common mistakes like:

  * Back rounding
  * Shallow squats
  * Misaligned elbows

### **Automatic Rep Counting**

Supports:

* Squats
* Push-ups
* Jumping Jacks
* Bicep Curls

No manual input. No cheating. Just clean rep tracking.



### **Comprehensive Analytics**

* Workout history
* Progress graphs
* Calorie burn estimation
* Performance insights

### **Secure Authentication**

* Powered by **NextAuth.js (Auth.js)**
* Google, GitHub, and Email login

### **Modern, Aesthetic UI**

* Dark mode
* Glassmorphism
* Smooth animations
* Built with **Tailwind CSS** & **Shadcn UI**

---

## 🛠️ **Tech Stack**

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| **Framework**  | Next.js 14 (App Router)      |
| **Language**   | TypeScript                   |
| **Styling**    | Tailwind CSS, Shadcn UI      |
| **AI / ML**    | TensorFlow.js, MoveNet       |
| **Auth**       | NextAuth.js                  |
| **Database**   | PostgreSQL (Vercel Postgres) |
| **ORM**        | Prisma                       |
| **Deployment** | Vercel                       |

---

## 📦 **Installation**

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/aura-fitness.git
cd aura-fitness
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file:

```
DATABASE_URL="your_postgres_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### **4. Initialize Prisma**

```bash
npx prisma generate
npx prisma db push
```

### **5. Run the Development Server**

```bash
npm run dev
```

Open:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧠 **How It Works**

### **1. Camera Input**

Secure webcam access via browser APIs.

### **2. Pose Estimation**

MoveNet processes each frame to identify 17 key body joints.

### **3. Geometry Analysis**

Custom math calculates:

* Joint angles
* Torso tilt
* Limb velocity
* Exercise posture

### **4. State Machine**

Determines phases:

* Down → Up
* Eccentric → Concentric
* Valid vs. invalid reps

### **5. Continuous Feedback Loop**

Alerts trigger when biomechanics deviate from safe form.

---



## 📄 **License**

This project is licensed under the **MIT License**.
See the `LICENSE` file for more details.

---


