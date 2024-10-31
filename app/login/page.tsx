"use client"
import { useState } from "react";
import { useRouter } from "next/navigation"; // Changed from next/navigation to next/router
import "../../scss/login.scss";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message , setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {

    if (!login || !password) {
      return;
    }
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });
      const data = await response.json();
      if (data.status === 200) {
        localStorage.setItem('token', data.token);
        router.push("/");
      } else if (data.status === 405) {
        setMessage(data.error)
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="login">
        <span className="login__background">
          <span className="login__shape"></span>
          <span className="login__shape"></span>
        </span>
        <div>
          <h3>Login Here</h3>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Пошта" id="username" name="username" value={login} onChange={(e) => setLogin(e.target.value)} required/>

          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Пароль" id="password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <p>{message}</p>
          <button onClick={handleSubmit}>Увійти</button>
        </div>
      </div>
    </>
  );
}
