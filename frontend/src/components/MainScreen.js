import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";

export const MainScreen = ({ title, children }) => {
  return (
    <div className="mainbg">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="hading">{title}</h1>
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};
