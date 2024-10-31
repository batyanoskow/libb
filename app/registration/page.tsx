"use client";
import React, { useState } from 'react';
import "../../scss/reg.scss"
import { useRouter } from 'next/navigation';
const Registration: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message , setMessage] = useState("");
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!login || !password) {
     
      return;
    }

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });
      const data = await response.json();
      if (data.status === 200) {
        const { token } = await response.json();
        localStorage.setItem("token" , token)
        router.push("/")
       
      } else {
       
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
     
    }
  };

  return (
     <>
     <div className="reg">
     <span className="reg__background">
      <span className="reg__shape"></span>
      <span className="reg__shape"></span>
    </span>
    <div>
      <h3>Register Here</h3>

      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Пошта" id="username" name="username" value={login} onChange={(e) => setLogin(e.target.value)} required/>

      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Пароль" id="password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <p>{message}</p>
      <button onClick={handleSubmit}>Зареєструватись</button>
  </div>
     </div> 
     
  </>
  );
};

export default Registration;