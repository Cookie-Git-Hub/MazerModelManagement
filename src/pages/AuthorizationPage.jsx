import { Navigate } from "react-router-dom";
import "./AuthorizationPage.css";
import AuthorizationForm from "../components/AuthorizationForm";
import { useTranslation } from "../hooks/useTranslation";
import { useAuth } from "../context/AuthContext";

const AuthorizationPage = () => {
  // const { t } = useTranslation();
  // const { isAuthenticated } = useAuth();
  return (
    <div className="authorization">
      <div className="authorizationForm">
        <h1>MazerModels</h1>
        <p>Welcome back, please login to your account</p>
        <AuthorizationForm />
        <p>Need assistance? Contact your agency representative</p>
      </div>
    </div>
  );
};

export default AuthorizationPage;
