'use client'
import { useParams } from "next/navigation"
import PostsUser from "../../components/profileComponents/postsUser"

export default function profile() {
    const params = useParams()
    return (
        <>
        <h1>Посты пользователя {params.name}</h1>
            <PostsUser id={params.id}/>
        </>
        
    )
}