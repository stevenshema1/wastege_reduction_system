
# Wastage Reduction System (WRS)

An intuitive web application designed to help users track, manage, and reduce waste effectively. It features a comprehensive dashboard, detailed waste record management, and insightful reporting with chart visualizations to promote sustainable practices like recycling and reuse.

*(Note: You can replace this with a screenshot of your running application)*

---

## ✨ Features

- **🔐 Secure User Authentication**: Full auth flow including login, registration, and password recovery.
- **📊 Insightful Dashboard**: At-a-glance view of total waste, recycled/reused quantities, and progress towards monthly goals.
- **🗑️ Comprehensive Waste Management**: Full CRUD (Create, Read, Update, Delete) functionality for waste records.
- **🔍 Advanced Filtering & Sorting**: Easily search and organize waste records by type, category, date, and more.
- **📈 Visual Reports**: Interactive pie and bar charts to analyze waste by status and category.
- **📄 PDF Export**: Generate and download detailed waste analysis reports directly from the app.
- **👤 User Profile Management**: Users can update their monthly waste reduction goals and profile picture.
- **📜 Activity Log**: Tracks all significant user actions for auditing and review.
- **🎨 Dark/Light Mode**: A sleek theme toggle for comfortable viewing in any lighting condition.
- **📱 Responsive Design**: A seamless experience on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

This project is a full-stack application built with modern web technologies.

-   **Frontend**:
    -   **Framework**: [React](https://reactjs.org/)
    -   **Language**: [TypeScript](https://www.typescriptlang.org/)
    -   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
    -   **Routing**: [React Router](https://reactrouter.com/)
    -   **Charts**: [Recharts](https://recharts.org/)
    -   **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)

-   **Backend**:
    -   **Framework**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
    -   **Database**: In-memory data store (for demonstration purposes).
    -   **Authentication**: Simple token-based password reset.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/download/) (version 16 or newer) and npm installed on your computer.

### Local Setup

**1. Clone the repository:**

```bash
git clone <your-repository-url>
cd <repository-directory>
```

**2. Set up the Backend Server:**

The backend is a Node.js/Express server that provides the API for the application.

```bash
# Navigate to the project root (where server.js is located)
# Install dependencies
npm install

# Start the server
npm start

-cd frontend 
- nom install
-npm run dev for 
YOU WILL SEE YOUR LOCAL IP ADDRESS TO ACCESS IN YOUR BROWSER 
```
AFTER CHANGE DIRECTORY TO frontent to see frontend side of My Application



The server will start running on `http://localhost:3001`. You will see a confirmation message in your terminal, along with the default login credentials.

**3. Run the Frontend Application:**

### Default Login Credentials

You can use the pre-configured mock user to log in and test the application:

-   **Email**: `admin@example.com`
-   **Password**: `password123`



---

##  usage How to Use the System

1.  **Register/Login**: Create a new account or log in with the default credentials.
2.  **Dashboard**: After logging in, you'll land on the dashboard, which gives you a quick overview of your waste statistics.
3.  **Add Waste**: Navigate to the "Waste Records" page and click the "Add New Waste" button. Fill in the details in the modal and save.
4.  **Manage Records**: On the Waste Records page, you can edit or delete existing records. Use the search bar and click on table headers to filter and sort your data.
5.  **View Reports**: Go to the "Reports" page to see visual charts of your waste data. Click "Export to PDF" to download a report.
6.  **Set Goals**: Visit the "Profile" page to set your monthly waste reduction target and update your profile picture.
7.  **Check Logs**: The "System Log" page shows a history of your recent activities within the app.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
