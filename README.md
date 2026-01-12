
## 🚀 Futuristic 3D Portfolio Website

A next-generation, interactive 3D portfolio website built to showcase my skills, projects, education, and professional journey in a modern, futuristic, and immersive experience. This portfolio goes beyond traditional web pages by using smooth camera transitions and interactive animations to present information in a visually engaging way.

## 👤 About Me

Hi 👋, I’m Ibran Siddique, a B.Sc. Information Technology student at B.K. Birla College and a passionate MERN Stack Developer with a strong interest in Java Backend Development.

I believe in continuous learning, adaptability, and building scalable, efficient applications using modern technologies. Along with technical expertise, I actively work on improving my soft skills, discipline, and professional mindset.

## 🚀 Features

-   **Responsive Design**: A modern, dark-themed UI that works seamlessly across all devices.
-   **Dynamic Content**: Server-side rendering with EJS.
-   **Contact Form**: Functional contact form integrated with **Supabase** database.
-   **Interactive Elements**: Custom cursor and smooth animations.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3, JavaScript, EJS (Embedded JavaScript templates)
-   **Backend**: Node.js, Express.js
-   **Database**: Supabase (PostgreSQL)
-   **Tools**: Nodemon, Dotenv

## 📂 Project Structure

```
My_Portfolio/
├── public/          # Static assets (CSS, JS, Images)
├── view/            # EJS templates (home.ejs)
├── partials/        # Reusable EJS parts (navbar, footer)
├── app.js           # Main application entry point
├── .env             # Environment variables
└── package.json     # Project dependencies and scripts
```

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ibran52/My_Portfolio.git
    cd My_Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_anon_key
    ```

4.  **Run Locally:**
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:3000`.

## ☁️ Deployment (Vercel)

This project is configured for deployment on Vercel.

1.  **Push to GitHub**: Ensure your latest code is on GitHub.
2.  **Import in Vercel**: Go to [Vercel](https://vercel.com/new), import your repository.
3.  **Environment Variables**: In the Vercel deployment settings, add the `SUPABASE_URL` and `SUPABASE_KEY` environment variables.
4.  **Deploy**: Click "Deploy" and your portfolio will be live!

## 📬 Contact

Feel free to reach out to me through the contact form on the website!
