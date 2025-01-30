import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import ErrorPanel from "../components/Error/ErrorPanel";
import "../styles/Views/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const handleLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    const response = await loginUser(login, password);
    if (response.status === 200) {
      navigate("/campaigns");
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };
  return (
    <div className="home-wrapper">
      <h1>Witaj w Wojcyb Dungeon Master System</h1>
      <form className="login-form" onSubmit={handleLoginUser}>
        <div className="login-wrapper ">
          <label htmlFor="login-input">Login:</label>
          <input
            id="login-input"
            name="login"
            type="text"
            placeholder="Podaj login"
          />
        </div>
        <div className="password-wrapper">
          <label htmlFor="password-input">Hasło:</label>
          <input
            id="password-input"
            name="password"
            type="password"
            placeholder="Podaj hasło"
          />
        </div>
        <button className="login-button" type="submit">
          Zaloguj
        </button>
      </form>

      {error && (
        <ErrorPanel
          status={error.status}
          message={error.message}
          onClick={() => setError(null)}
        />
      )}
    </div>
  );
};

export default Home;
