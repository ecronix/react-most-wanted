import React, { useState } from 'react'
import * as BS from "react-bootstrap"
import { BsChevronDown } from "react-icons/bs"

export default function MenuDropdownMobile({ navItem, className }) {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <BS.Col
            className="top-0 float-right bg-dark p-2 overflow-hidden"
            style={{
                maxHeight: menuOpen ? 500 : 30,
                transition: 'max-height 2s linear',
            }}
        >
            <div style={{
                color: 'white', padding: '0 0.5rem',
            }} onClick={() => setMenuOpen(!menuOpen)}>{navItem.displayName} <BsChevronDown /></div>
            {navItem.nested?.map(menuItem => {
                return menuItem.nested ? <MenuDropdownMobile style={{ position: 'relative' }} key={menuItem.displayName} navItem={menuItem} /> :
                    <BS.Nav.Link key={menuItem.displayName} href={menuItem.path} className="text-light">
                        {menuItem.displayName}
                    </BS.Nav.Link>
            })}
        </BS.Col>
    )
}
