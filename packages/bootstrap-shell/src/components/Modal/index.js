import { Modal } from 'react-bootstrap'

import React from 'react'

export default function index() {
    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title> 1 Title </Modal.Title>{' '}
            </Modal.Header>{' '}
            <Modal.Body>
                <p> here is the body </p>{' '}
            </Modal.Body>{' '}
            <Modal.Footer>
                <p> Issa footer </p>{' '}
            </Modal.Footer>{' '}
        </Modal.Dialog>
    )
}
