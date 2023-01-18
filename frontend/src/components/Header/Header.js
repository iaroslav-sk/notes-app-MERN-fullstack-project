import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar, Container, Nav, NavDropdown, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };
  console.log("first");
  return (
    <Navbar bg="light" expand="lg" variant="grays">
      <Container>
        <Navbar.Brand href="/">
          <Link to="/">Main</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo ? (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">
                <Link to="/mynotes">All notes</Link>
              </Nav.Link>
              <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  LogOut
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          ) : (
            <Nav.Link href="#action1">
              <Link to="/login">Login</Link>
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
