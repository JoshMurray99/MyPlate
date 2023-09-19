import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { BASE_URL } from '../../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [isLogin, setLogin] = useState(true)
    const [loginForm, setLoginForm] = useState({ username: "", password: "" })
    const [registrationForm, setRegistrationForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
    });

    const handleClose = () => {
        setShow(false)
        setLogin(true)
    }

    const handleShow = () => setShow(true)


    const toggleForm = () => {
        setLogin(!isLogin)
    }

    const loginHandleChange = (e) => {
        const { name, value } = e.target
        setLoginForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }

    const registerHandleChange = (e) => {
        const { name, value } = e.target
        setRegistrationForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }

  

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (!isLogin) {
                const response = await axios.post(`${BASE_URL}/user/register`, {
                    first_name: registrationForm.firstName,
                    last_name: registrationForm.lastName,
                    username: registrationForm.username,
                    email: registrationForm.email,
                    password: registrationForm.password
                })

                if (response.status === 201) {
                    alert('registration successful!')
                    handleClose()
                }
            }

            else {
                const response = await axios.post(`${BASE_URL}/user/login`, {
                    username: loginForm.username,
                    password: loginForm.password
                })
                if (response.status === 200) {
                    localStorage.clear()
                    localStorage.setItem('user_id', response.data.user_id);
                    localStorage.setItem('token', response.data.token);
                    alert('login success')
                    navigate('/home')
                }
            }
        } catch (e) {
            console.error(e)
            if (!isLogin) {
                alert('Unable to register')
            }
            else {
                alert("Login details incorrect")
            }
        }}




    return (
        <>
            <p>Hello</p>
            <button onClick={handleShow}>Get started</button>
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                centered
            >
                <Modal.Header>
                    {isLogin ? (
                        <>
                            Login
                        </>
                    ) : (
                        <>
                            Register
                        </>
                    )}

                </Modal.Header>
                <Modal.Body>
                    <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
                        {isLogin ? (
                            <>
                                <input
                                    type='text'
                                    placeholder='username'
                                    name='username'
                                    value={loginForm.username}
                                    onChange={(e) => loginHandleChange(e)}
                                    required />

                                <input type='password'
                                    placeholder='password'
                                    name='password'
                                    value={loginForm.password}
                                    onChange={(e) => loginHandleChange(e)}
                                    required />

                                <input
                                    type='submit'
                                    value="Login"
                                />
                            </>
                        ) : (
                            <>
                                <input
                                    type='text'
                                    placeholder='firstname'
                                    name='firstName'
                                    value={registrationForm.firstName}
                                    onChange={(e) => registerHandleChange(e)}
                                    required />

                                <input
                                    type='text'
                                    placeholder='lastname'
                                    name='lastName'
                                    value={registrationForm.lastName}
                                    onChange={(e) => registerHandleChange(e)}
                                    required />

                                <input type='text'
                                    placeholder='email'
                                    name='email'
                                    value={registrationForm.email}
                                    onChange={(e) => registerHandleChange(e)}
                                    required />

                                <input
                                    type='text'
                                    placeholder='username'
                                    name='username'
                                    value={registrationForm.username}
                                    onChange={(e) => registerHandleChange(e)}
                                    required />

                                <input
                                    type='password'
                                    placeholder='password'
                                    name='password'
                                    value={registrationForm.password}
                                    onChange={(e) => registerHandleChange(e)}
                                    required />

                                <input
                                    type='submit'
                                    value="Register"
                                />
                            </>
                        )}
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    {isLogin ? (
                        <button onClick={toggleForm}>Need an account? Register here</button>
                    ) : (
                        <button onClick={toggleForm}>Already have an account? Login here</button>
                    )}

                </Modal.Footer>

            </Modal>
        </>
    )
}
