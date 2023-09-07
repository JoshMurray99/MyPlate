import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'

export default function Landing() {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)
  return (
    <>
    <button onClick={handleShow}>Get started</button>
    <Modal
       show={show}
       onHide={handleClose}
       keyboard={false}
       centered
    >
        <Modal.Body>
            <p>Hello</p>

        </Modal.Body>

    </Modal>
    </>
  )
}
