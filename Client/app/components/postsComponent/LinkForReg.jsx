'use client'
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const axios = require('axios').default



const LinkForReg = ({uri}) => {
    const [result, setResult] = useState('')
    const router = useRouter()
    const path = usePathname()
    useEffect(() => {
        const getData = localStorage.getItem('dataUser')
        const parseData = JSON.parse(getData)
        if (getData) {
            axios.post('http://localhost:3001/api/LogIn', {
                userName: parseData.name,
                password: parseData.password,
                loadPageChack: true
            })
            .then(() => router.push(path.includes('/login') ? '/' : path))
            .catch(err => {setResult(err); console.log(err)})
            
        } else {
                router.push('../login')
            }
        
    }, [])
        

    return (
        <>
            
        </>
    )
}

export default LinkForReg