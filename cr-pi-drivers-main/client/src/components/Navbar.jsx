import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoFormulaUno from "../assets/logoFormulaUno.png";
import styles from "../components/Navbar.module.css";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    onSearch(query);
    setTimeout(() => {
      setQuery("");
    }, 2000);
  };

  return (
    <div>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <div className={styles.headerLogo}>
              <Link to="/home">
              <img
                className={styles.logoFormulaUno}
                src={logoFormulaUno}
                alt="logoFormulaUno"
              />
              </Link>
            </div>
            <nav className={styles.leftHeaderNavigation} role="navigation">
              <Link to="/create">
                <p className={styles.createLink}>Create</p>
              </Link>
              <Link to="/home">
                <p className={styles.homeLink}>Home</p>
              </Link>
            </nav>
          </div>
          <div className={styles.headerMiddle}>
            <div className={styles.headerSearch}>
              <form onSubmit={submitForm}>
                <input
                  className={styles.input}
                  type="text"
                  autoComplete="off"
                  value={query}
                  placeholder="Search"
                  onChange={handleChange}
                />
                <button type="submit" className={styles.button}>
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className={styles.headerRight}>
            <nav className={styles.rightHeaderNavigation} role="navigation">
              <Link to="/about">
                <p className={styles.aboutLink}>About</p>
              </Link>
              <Link to="/login">
                <p className={styles.logOutLink}>Log Out</p>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
