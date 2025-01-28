import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";

const Home = () => {
    const navigate = useNavigate()
    const handleLoginUser = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        const login = formData.get('login') as string
        const password = formData.get('password') as string

        const responseStatus = await loginUser(login, password)
        if (responseStatus == 200) { navigate('/campaigns')}

    }
    return (
        <>
        <h1>Witaj w Wojcyb Dungeon Master System</h1>
        <form onSubmit={handleLoginUser}>
        <label htmlFor="login-input">Login:</label>
        <input id="login-input" type='text' placeholder="Podaj login"/>
        <label htmlFor="password-input">Hasło:</label>
        <input id="password-input" type='password' placeholder="Podaj hasło"/>
        <button type="submit">Zaloguj</button>
        </form>
        </>
    )
}

export default Home;