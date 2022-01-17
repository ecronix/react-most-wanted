import React from 'react'
import * as BS from "react-bootstrap"

export default function MenuDropdown({ navItem, className }) {

    return (
        navItem &&
        <BS.NavDropdown className={className} menuVariant='dark' title={navItem.displayName}>
            {navItem?.nested?.map(item => {
                return item.nested ? <MenuDropdown className="dropdown-submenu" navItem={item} />
                    : <BS.NavDropdown.Item href={item.path}>{item.displayName}</BS.NavDropdown.Item>

            })}
        </BS.NavDropdown>

    )
}
