import React from "react";

export default () => {
  return (
    <footer>
      <div className="row">
        <div className="row">
          <ul className="social-links">
            <li>
              <a href="https://www.facebook.com">
                <i className="fab fa-facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com">
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
