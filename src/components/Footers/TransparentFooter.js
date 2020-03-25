/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <a herf="#">SmartMed</a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Made by{" "}
          <a
            href="#"
          >
            Vridhi
          </a>
          &nbsp;and&nbsp;
          <a
            href="#"
          >
            Pankti 
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
