import React from 'react'
import * as BS from "react-bootstrap"

export default function MenuContent({ children }) {
    return <BS.Col>
        {children}
    </BS.Col>
}
