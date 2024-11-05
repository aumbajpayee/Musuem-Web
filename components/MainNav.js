// components/MainNav.js
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark" style={{ backgroundColor: '#2c3e05', padding: '10px 20px' }}>
        <Navbar.Brand style={{ fontWeight: 'bold', color: 'white' }}>Aum Bajpayee</Navbar.Brand>
        <Nav className="me-auto">
          <Link href="/" passHref legacyBehavior>
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Link href="/search" passHref legacyBehavior>
            <Nav.Link>Advanced Search</Nav.Link>
          </Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <Button type="submit" variant="success" style={{ borderRadius: '4px', padding: '0.375rem 0.75rem' }}>Search</Button> {/* Updated button styling */}
        </Form>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
