'use client'
import { memo } from 'react'
import '../style/styleForPosts/userPosts.css'
import UserPost from './post'
import {useContext} from 'react'
import { DataContext } from './provider'
const AllPosts = memo(() => { 
    const context = useContext(DataContext)
    return (
        <div className='MainBlockUserPost' >
            {
            context.length === 0 
            ? 
            <p>Объект пуст</p>
            :
            context.map(el => (
                <UserPost el={el}/>
                    
            ))
            }
        </div>
    )
})




export default AllPosts