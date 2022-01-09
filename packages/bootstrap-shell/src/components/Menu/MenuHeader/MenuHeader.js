import React from 'react'
import * as BS from "react-bootstrap";
import { useConfig } from 'base-shell/lib/providers/Config'
import RMWLogo from "../../../assets/rmw.svg";

export default function MenuHeader() {
    const { appConfig } = useConfig();
    const { menu } = appConfig || {}
    const logo = menu.headerLogo ? menu.headerLogo : RMWLogo;
    const logoWidth = menu.headerLogoWidth ? menu.headerLogoWidth : 100;
    return (
        <BS.Col>
            <BS.Image src={logo} style={{
                width: logoWidth
            }} />
        </BS.Col>
    )
}
