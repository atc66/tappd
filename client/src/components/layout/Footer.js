import React from "react";

export default () => {
  return (
    <footer>
      <div className="row">
        <div className="col span-1-of-2">
          <ul className="footer-nav">
            <li>
              <a href="#features">About us</a>
            </li>
          </ul>
        </div>
        <div className="col span-1-of-2">
          <ul className="social-links">
            <li>
              <a href="#">
                <i className="fab fa-facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <p>Copyright &copy; {new Date().getFullYear()} Tappd</p>
      </div>
    </footer>
  );
};
