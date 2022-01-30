import './Login.css'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context';
import axios from 'axios';
import { useContext, useRef,useState } from "react";

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context)
    const [state, setstate] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            
        } catch (err) {
            setstate(err.response.data)
            console.log(err.response.data)
            dispatch({ type: 'LOGIN_FAILURE' });
        }
    }

    


    return (
        <div className='loginContainer'>
            <h1>Login</h1>
            <div className="loginParent">
                <form className="loginForm" onSubmit={handleLogin}>
                    <input type="email" placeholder='Email' ref={emailRef} required autoFocus={true}/>
                    <input type="password" placeholder='Password' ref={passwordRef} />
                    <button type='submit' disabled={isFetching}>Login</button>
                    <span>{state}</span>
                </form>
                <Link to='/register' className='link register'>Register?</Link>
            </div>
        </div>
    )
}

export default Login
