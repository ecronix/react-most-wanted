import React from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ({ children }) {
  //const { appConfig } = useConfig()

  return (
    <React.Fragment>
      <Container fluid>
        {children}
      </Container>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
    </React.Fragment>
  )
}
