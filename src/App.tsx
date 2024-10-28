import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/sign-up/Signup";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import CodeSnippetPage from "./pages/code-snippets/CodeSnippet";
import CreateCodeSnippetPage from "./pages/code-snippets/CreateCodeSnippet";
import UpdateCodeSnippetPage from "./pages/code-snippets/UpdateCodeSnippet";
import ViewCodeSnippetPage from "./pages/code-snippets/ViewCodeSnippet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'highlight.js/styles/default.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/code-snippets" element={<ProtectedRoute><CodeSnippetPage /></ProtectedRoute>} />
          <Route path="/create-snippet" element={<ProtectedRoute><CreateCodeSnippetPage /></ProtectedRoute>} />
          <Route path="/update-snippet/:id" element={<ProtectedRoute><UpdateCodeSnippetPage /></ProtectedRoute>} />
          <Route path="/share-snippet/:guid" element={<ViewCodeSnippetPage />} />
        </Routes>
        <ToastContainer 
          position="top-right" 
          autoClose={5000}
          hideProgressBar={false} 
          newestOnTop={false}  
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  )
}

export default App