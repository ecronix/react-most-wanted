import React from 'react'
import * as BS from "react-bootstrap"

export default function MenuDropdownMobile({ navItem, className }) {

    return (
        navItem &&
        <BS.NavDropdown className={className} menuVariant='dark' title={navItem.displayName}>
            {navItem?.nested?.map(item => {
                console.log(item);
                if (item.nested) {
                    return <MenuDropdownMobile className="dropdown-submenu-mobile" navItem={item} />;
                }
                else {
                    return <BS.NavDropdown.Item className="text-light" href={navItem.path}>{item.displayName}</BS.NavDropdown.Item>
                }
            })}
        </BS.NavDropdown>

    )
}
