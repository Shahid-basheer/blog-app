import './Register.css'
//import { Link } from 'react-router-dom'
import {useState,useRef} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'


const Register = () => {
const uname = useRef()
const email = useRef()
const pass = useRef()
const [error,setError] = useState('')
const history = useHistory()


const handleSubmit = async(e)=>{
e.preventDefault()

const data = {
    username:uname.current.value,
    email:email.current.value,
    password:pass.current.value
}

axios.post('/register',data).then((res)=>{
    console.log(res.data)
history.push('/login')
}).catch((e)=>{
setError(e.response.data)
})
}

const style ={
    margin:'20px 0 0 0',
    fontFamily:'Verdana, Geneva, Tahoma, sans-serif',
    fontSize:'25px'
}


    return (
      <div className="containers">
        <marquee style={style} width="45%" direction="right" height="10px">
          Welcome to the blog
        </marquee>
        <marquee style={style} width="45%" direction="left" height="10px">
          This is blog app
        </marquee>
        <div className="registerParent">
          <h1>Register</h1>
          <form className="registerForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              autoFocus={true}
              ref={uname}
              required={true}
            />
            <input
              type="email"
              placeholder="Email"
              ref={email}
              required={true}
            />
            <input
              type="password"
              placeholder="Password"
              ref={pass}
              required={true}
            />
            <button type="submit">Register</button>
            {error && <span id="error-rigister">{error}</span>}
          </form>
        </div>
      </div>
    );
}

export default Register
