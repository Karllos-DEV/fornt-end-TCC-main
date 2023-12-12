import { Link } from "react-router-dom";
import React from 'react';


const Header = () => {
 return (
    <header>
      <Link to="../assets/LogoHouse.png" alt="logo"></Link> 
      <div className="menuToggle container"></div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Idioma<i className='bx bxs-down-arrow' style={{ fontSize: '6px', position: 'relative', top: '3.8px' }}></i></a>
            <ul>
              <li><a href="#">Português</a></li>
              <li><a href="#">Inglês</a></li>
              <li><a href="#">Xing Xong</a></li>
            </ul>
          </li>
          <li><a href="#" className="Login"><i className='bx bxs-user' style={{ fontSize: '10px', position: 'relative', top: '2px', right: '10px' }}></i>Login</a></li>
        </ul>
        <div className="nav_baixo">
          <div className="socials">
            <a href="#" id="facebook"><i className='bx bxl-facebook-square'></i></a>
            <a href="#" id="twitter"><i className='bx bxl-twitter'></i></a>
            <a href="#" id="twitch"><i className='bx bxl-twitch'></i></a>
            <a rel="noreferrer noopener" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" id="youtube"><i className='bx bxl-youtube'></i></a>
            <a href="#" id="instagram"><i className='bx bxl-instagram'></i></a>
            <a href="#" id="discord"><i className='bx bxl-discord'></i></a>
          </div>
        </div>
      </nav>
    </header>
 );
};

export default Header;
