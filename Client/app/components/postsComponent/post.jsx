import Link from 'next/link'
import '../style/styleForPosts/userPosts.css'
import EditAndDel from './MainBlockForEdPost'
import Like from '../image/like.png'
import Image from 'next/image'
import likeFn from "../postsComponent/likeFunction";

const axios = require('axios').default

const UserPost = (props) => {
    const el = props.el

    const parseLocalStorage = JSON.parse(localStorage.getItem('dataUser'))
    
    return(
        <>
            <div id='UserPosts' key={el._id}>
                {parseLocalStorage.name === el.userName && <EditAndDel />}
                <h2 class={parseLocalStorage.name === el.userName ? 'myPosts' : 'noMyPosts'}><Link href={"/" + el._id + "/" + el.userName}>{el.userName}</Link></h2>
                <div className='poster'><b>{el.message}</b></div>
                <div  className='blockLike'> <Image onClick={() => likeFn(el._id, 1) } className='ButtonLike' src={Like} alt='Not Image' /> <big className='countLike'>{el.countLike}</big></div>
                <hr />
                <b className='timePost'>{el.timeHour} : {el.timeMin}</b>
                
            </div>
        </>
    )
}


export default UserPost