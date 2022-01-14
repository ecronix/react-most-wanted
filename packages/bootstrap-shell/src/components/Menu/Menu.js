import React from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import * as BS from 'react-bootstrap'
import RMWLogo from "../../assets/rmw.svg";
import { useMenu } from 'bootstrap-shell/lib/providers/Menu'
import { SET_IS_MOBILE_MENU_OPEN } from "bootstrap-shell/lib/providers/Menu/store/types";
import { GiHamburgerMenu } from 'react-icons/gi'

const Menu = ({ brand }) => {
  const { appConfig } = useConfig()
  const { menu } = appConfig || {}
  const { globalBrand, MenuRight, menuItems } = menu || {}
  const menuContext = useMenu();
  const { DISPATCH_ACTION, isMobileMenuOpen } = menuContext;

  const _brand = brand ? brand : globalBrand
  console.log(isMobileMenuOpen)

  return (
    <header>
      <BS.Navbar bg="dark">
        <BS.Container fluid className="justify-content-space-between">
          <BS.Col>
            <BS.Navbar>
              <BS.Navbar.Brand href="#home" className="text-white">
                {brand ? _brand : <img src={RMWLogo} alt="RMW Logo" width="40px" />}
              </BS.Navbar.Brand>
              <BS.Navbar.Toggle aria-controls="basic-navbar-nav" />
              <BS.Navbar.Collapse>
                <BS.Nav className="d-none d-md-flex d-lg-flex">
                  {menuItems.map(({ path, displayName }) => {
                    return (
                      <BS.Nav.Link
                        key={displayName}
                        href={path}
                        className="text-light"
                      >
                        {displayName}
                      </BS.Nav.Link>
                    )
                  })}
                </BS.Nav>
              </BS.Navbar.Collapse>
            </BS.Navbar>
          </BS.Col>
          <BS.Col>
            <BS.Navbar className="d-none d-md-flex d-lg-flex justify-content-end">
              {MenuRight && <MenuRight />}
            </BS.Navbar>
            {/*Mobile Menu*/}
            <BS.Navbar className="d-sm-flex d-md-none d-lg-none justify-content-end">
              <GiHamburgerMenu
                className="text-white d-sm-block d-md-none d-lg-none"
                onClick={() => DISPATCH_ACTION(SET_IS_MOBILE_MENU_OPEN)}
              />
            </BS.Navbar>
          </BS.Col>
        </BS.Container>
      </BS.Navbar>
      {/*Mobile Menu*/}
      <BS.Col
        className="top-0 float-right bg-dark p-2 overflow-hidden"
        style={{
          maxHeight: isMobileMenuOpen ? 1000 : 0,
          transition: 'max-height 2s linear',
        }}
      >
        {menuItems.map(({ path, displayName }) => {
          return (
            <BS.Nav.Link key={displayName} href={path} className="text-light">
              {displayName}
            </BS.Nav.Link>
          )
        })}
        {MenuRight && <MenuRight />}
      </BS.Col>
    </header>
  )
}

export default Menu
