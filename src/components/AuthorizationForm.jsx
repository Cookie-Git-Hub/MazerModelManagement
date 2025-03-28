import "./AuthorizationForm.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthorizationForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <form className="authorization-form" onSubmit={handleSubmit}>
      {/* <UserCircle2 size={20} /> */}
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <p>Forgot password?</p>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default AuthorizationForm;
