import React, { useContext } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import * as BS from "react-bootstrap";
import RMWLogo from "../../assets/rmw.svg";
import { useMenu } from 'bootstrap-shell/lib/providers/Menu'

const Menu = ({ brand }) => {
  const { appConfig } = useConfig();
  const { routes } = appConfig || {};
  const { menu } = appConfig || {};
  const { globalBrand, MenuRight } = menu || {};
  const menuContext = useMenu();
  console.log(menuContext);
  //const { toggleThis } = menuContext || {};

  const _brand = brand ? brand : globalBrand;

  return <header>
    <BS.Navbar bg="dark">
      <BS.Container fluid className="justify-content-space-between">
        <BS.Col>
          <BS.Navbar>
            <BS.Navbar.Brand href="#home" className="text-white">
              {_brand ? _brand : <img src={RMWLogo} alt="RMW Logo" width="40px" />}
            </BS.Navbar.Brand>
            <BS.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <BS.Navbar.Collapse>
              <BS.Nav>
                {routes.filter(({ generateHeaderLink }) => generateHeaderLink).map(({ path, displayName }) => {
                  return <BS.Nav.Link key={displayName} href={path} className="text-light">{displayName}</BS.Nav.Link>
                })}
              </BS.Nav>
            </BS.Navbar.Collapse>
          </BS.Navbar>
        </BS.Col>
        <BS.Col className="d-flex justify-content-end">
          <BS.Navbar>
            {MenuRight && <MenuRight />}
          </BS.Navbar>
        </BS.Col>
      </BS.Container>
    </BS.Navbar>
  </header>
}



export default Menu
