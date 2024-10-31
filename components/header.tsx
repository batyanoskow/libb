"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../scss/header.scss"
const Header = () => {
  
    const [isTokenValid, setisTokenValid] = useState(false)
    const router = useRouter();
    const handleLogOut = () => {
        localStorage.setItem("token" , "")
        setisTokenValid(false);
    }
    async function isVal() {
      try {
        let token:any;
        if(typeof window !== 'undefined'){
          token = localStorage.getItem("token");
        }
          if (token && token !== "") {
              const response = await fetch('/api/middleware/validjwt', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              });
              if (response.status === 200) {
                  setisTokenValid(true);
              }
          }
      } catch (error) {
          console.error('Error verifying token:', error);
      }
  }
  isVal();
  
    return(
        <>
            <header className="header">
                <div className="header__container">
                    <div className="header__menu menu">
                        <div className="menu__list">
                            <Link href="/news">Новини</Link>
                            <Link href="/comming">Нові Надходження</Link>
                        </div>
                        <div className="menu__auth">
                            {isTokenValid ? 
                                <button className="menu__logout" onClick={handleLogOut}><span className="icon">&#x279C;</span> Вихід</button>: 
                                (<>
                                    <Link  className="menu__login" href="/login">Увійти</Link>
                                    <Link className="menu__register" href="/registration">Зареєструватись</Link>
                                </>) 
                            }
                           
                            
                        </div>
                    </div>
                </div>
            </header>        
        </>
    )
}

export default Header;