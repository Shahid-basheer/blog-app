import './Write.css'
import axios from 'axios'
import { Context } from '../../Context/Context'
import {useHistory} from 'react-router-dom';
import { useState, useContext, useEffect,useRef } from 'react'


const Write = () => {
    const scroll = useRef()
    const { user } = useContext(Context)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const [loader, setloader] = useState(0)
    const [status, setstatus] = useState('')
     const history = useHistory()


    useEffect(() => {
        window.scroll(0, 0);
        document.querySelector('.progress-btn').style.width = loader + '%'
        scroll.current?.scrollIntoView({ behaviour: "smooth" });

    }, [loader])

    const HandleSubmit = (e) => {

        e.preventDefault()
        setstatus('')
        const newPost = {
            title,
            desc,
            username: user?.userD.username,
            userId:user?.userD._id
        };
        if (file) {
            const HandleResponse = () => {
                document.querySelector('#progress-btn').innerHTML = ''
            }
            HandleResponse()
            const options = {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percent = Math.floor((loaded * 100) / total)
                    setloader(percent)
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);
                }
            }
            const data = new FormData()
            data.append("file", file)
            data.append('upload_preset', 'movie-images')

            axios.post('https://api.cloudinary.com/v1_1/dyaqiakqz/image/upload', data, options).then((res) => {
                newPost.image = res.data.secure_url
                axios.post('/posts', newPost)
                    .then((res) => {
                        alert('Successfully Published')
                        setstatus('Successfully Published...')
                        history.push(`/posts/${res.data._id}/${res.data.userId}`)
                    })
                    .catch(e => setstatus(e.response.data))
                
                
            })
                .catch(e => setstatus(e.response.data.error.message))

        } else {

            axios.post('/posts/', newPost)
                .then((res) => {
                    alert('Successfully Published')
                    setstatus('Successfully Published...')
                })
                .catch(e => setstatus(e.response.data.message))

            
        }





    }
    return (
        <div id='container'>

            <div className='write'>
                {
                    file && (
                        <img className='writeImg' src={URL.createObjectURL(file)} alt="" />

                    )
                }
                <form className="writeForm" onSubmit={HandleSubmit} >

                    <label htmlFor="fileInput">
                        <i className=" writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id='fileInput' style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                    <span>Choose your image</span><br />
                    <input type="text" placeholder='title' className='writeInput' required onChange={e => setTitle(e.target.value)} autoFocus={true} />
                    <textarea type='text' placeholder='Tell your sotry....' required className='writeInput writeText' onChange={e => setDesc(e.target.value)}></textarea>

                    <button type='submit' >
                    {loader?<div className='progress-btn'>{loader + '%'}</div>:<div className='progress-btn'></div>}
                        
                        {
                            status?<span id='progress-btn' >{status}</span>:<span id='progress-btn' >Publish</span>
                        }
                        
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default Write
