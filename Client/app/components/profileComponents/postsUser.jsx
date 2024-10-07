'use client'
import { useState, useEffect, memo } from "react";
import '../style/styleForPosts/userPosts.css'
import UserPost from "../postsComponent/post";
const axios = require('axios').default

const PostsUser = ({id}) => {
    const userId = localStorage.getItem('dataUser')
    const parseID = JSON.parse(userId)
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            try { 
                if (!id){
                    const getData = await axios.get('http://localhost:3001/api/get-data-user/' + parseID.id)
                    setData(getData.data)
                    console.log(data.data)
                } else {
                    const getData = await axios.get('http://localhost:3001/api/get-messages/' + id)
                    setData(getData.data)
                    console.log(getData)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getData()
        
    }, [])

    return(<>
        {data 
        ?
        data.map(el => (
           <div key={el._id}> <UserPost el={el}/></div>
        ))
        : <b>Постов нет :(</b>
        }
    </>)
} 

export default PostsUser