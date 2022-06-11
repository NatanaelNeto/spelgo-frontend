import React from "react";

function Header() {
  const navMenu = ['uno', 'duo', 'trio', 'pool'];
  return(
    <nav>
      <div>
        <ul>
          {navMenu.map((item) => <li>{item}</li>)}
        </ul>
      </div>
      <div className="logo">
        <h1>spelGo</h1>
      </div>
    </nav>
  );
};

export default Header;
