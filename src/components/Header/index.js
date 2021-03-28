import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/**
 * @author
 * @function Header
 */

const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout);
  }


  const renderLoggedInLinks = () => {
    return (
      <Nav>

        <li className="nav-item">
          <span className="nav-link" onClick={logout} >Signout</span>
        </li>

      </Nav>
    );
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/*<Nav.Link href="#deets">Signin</Nav.Link>*/}
        <li className="nav-item">
          <NavLink to="Login" className="nav-link" >Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="Register" className="nav-link" >Register</NavLink>
        </li>

      </Nav>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
      <Container fluid>
        {/*<Navbar.Brand href="#home">Glitters</Navbar.Brand>*/}
        <Link to="/" className="navbar-brand">Glitters</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/*  <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>*/}
          </Nav>
            {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>

    </Navbar>
  )
}

export default Header