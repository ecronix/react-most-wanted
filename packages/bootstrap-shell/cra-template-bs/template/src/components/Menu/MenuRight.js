
import React from 'react'
import * as BS from "react-bootstrap"
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";

export default function MenuRight() {
    return (<>
        <BS.Nav.Link className="text-light" href='/home'>Hallo</BS.Nav.Link>
        <BS.Nav.Link className="text-light" href='/home'><BsFacebook /></BS.Nav.Link>
        <BS.Nav.Link className="text-light" href='/home'><BsInstagram /></BS.Nav.Link>
        <BS.Nav.Link className="text-light" href='https://github.com/TarikHuber/react-most-wanted'><BsGithub /></BS.Nav.Link>
        <BS.Button variant="light">Download</BS.Button>
    </>
    )
}
