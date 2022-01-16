import React from 'react'
import * as BS from "react-bootstrap"

export default function MenuDropdown({ navItem, className }) {

    return (
        navItem &&
        <BS.NavDropdown className={className} menuVariant='dark' title={navItem.displayName}>
            {navItem?.nested?.map(item => {
                if (item.nested) {
                    return <MenuDropdown className="dropdown-submenu" navItem={item} />;
                }
                else {
                    return <BS.NavDropdown.Item href={navItem.path}>{item.displayName}</BS.NavDropdown.Item>
                }
            })}
        </BS.NavDropdown>

    )
}
