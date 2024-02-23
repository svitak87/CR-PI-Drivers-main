import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoFormulaUno from "../assets/logoFormulaUno.png";
import styles from "../components/Navbar.module.css";


const Navbar = ({onSearch}) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const {value} = event.target
    setQuery(value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    onSearch(query); 
  };

  return (
    <div>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <div className={styles.headerLogo}>
              <img
                className={styles.logoFormulaUno}
                src={logoFormulaUno}
                alt="logoFormulaUno"
              />
            </div>
            <nav className={styles.leftHeaderNavigation} role="navigation">
              <ul>
                <Link to="/create">
                <li>
                  <p className={styles.createLink}>Create</p>
                </li>
                </Link>
                <Link>
                <li>
                  <p className={styles.homeLink}>Home</p>
                </li>
                </Link>
              </ul>
            </nav>
          </div>
          <div className={styles.headerMiddle}>
            <div className={styles.headerSearch} role="search">
              <form onSubmit={submitForm}>
                <input
                  type="text"
                  autoComplete="off"
                  value={query}
                  placeholder="Search"
                  onChange={handleChange}
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
          <div className={styles.headerRight}>
            <nav className={styles.rightHeaderNavigation} role="navigation">
              <ul>
                <li>
                  <p className={styles.aboutLink}>About</p>
                </li>
                <Link to="/login">
                  <li>
                    <p className={styles.logOutLink}>Log Out</p>
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
