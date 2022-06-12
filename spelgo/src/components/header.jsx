import React from "react";
import { Link } from 'react-router-dom';

class Header extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    const navMenu = ['uno', 'duo', 'trio', 'pool'];
    return (
      <nav>
        <div>
          <ul>
            {navMenu.map((item) => (
              <li className={item === this.props.active && 'active'}>
                <Link to={`/${item}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="logo">
          <h1>spelGo</h1>
        </div>
      </nav>
    );
  }
}

export default Header;
