'use client'
const axios = require('axios').default
import '../style/styleForPosts/addPost.css'
import React, { useEffect, useRef, useState } from 'react'


const FormAddUser = ({setMessages}) => {
    //Какой то говнокод не обращайте внимание я был молод
    let [post, setPost] = useState('')
    const formRef = useRef(null)
    const [styleLabelPost, setStyleLabelPost] = useState({XpossitionLabelPost: -4, colorTextLabelPost: 'white',YpossitionLabelPost:20})
    let [typeButton, setTypeButton] = useState("button")
    const parseData = JSON.parse(localStorage.getItem('dataUser'))
    


    const submitData = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/api/addPosts', {
            post: post,
            userId: parseData.id
        })
          .then(res => setMessages(res.data))
          .catch(err => console.log(err))
    }


    useEffect(() => {
        if (post.length === 0){
            setTypeButton('button')
            setStyleLabelPost({
                XpossitionLabelPost: -4, 
                colorTextLabelPost:'white', 
                YpossitionLabelPost:20
            })
        } else{
            setTypeButton('submit')
        }
    }, [post])
    
    return (
        <section>
            <div id='addPostForm'>
                <form ref={formRef} onSubmit={submitData} method='post'>
                    <label style={{ position:'relative',left:styleLabelPost.YpossitionLabelPost + 'px', bottom:styleLabelPost.XpossitionLabelPost + 'px'}} className='labelAddPost' htmlFor='Name'><div style={{color:styleLabelPost.colorTextLabelPost}}>Ваш пост</div></label>
                    <input autoComplete='off' onChange={(event) => {
                        setPost(post = event.target.value); 
                        setStyleLabelPost({XpossitionLabelPost: 10, colorTextLabelPost: 'rgb(187, 187, 187)', YpossitionLabelPost:0})
                        }} type='text' className='styleInputForPost' name='post' id='PostTextArea' maxLength={300} />                    
                    <button id='buttonSubmit' onClick={() => {formRef.current.reset()}}  className='ButtonForPublication' type={typeButton}>Опубликовать</button>
                </form>
            </div>
        </section>
    )
}

export default FormAddUser