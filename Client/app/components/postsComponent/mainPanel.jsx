'use client'
import Link from "next/link"
import Image from "next/image"
import iconProfile from '../image/icon_profile.png'
import iconHome from '../image/home.png'
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export const MainPanel = () => {
    const pathName = usePathname()
    const navigateRef = useRef()
    useEffect(() => {
        switch (pathName) {
            case '/':
                navigateRef.current.classList.remove('navigateForHome')
                navigateRef.current.classList.add('navigateAnim')
                setTimeout(() => {
                    navigateRef.current.classList.remove('navigateAnim')
                }, 1000)
                break;
        
            case '/posts':
                navigateRef.current.classList.add('navigateForHome')
                navigateRef.current.classList.add('navigateAnim')
                setTimeout(() => {
                    navigateRef.current.classList.remove('navigateAnim')
                }, 1000)
                break;
        }
    }, [pathName])
    return (
        <>
        <hr id="hrForMainPanel"/>
        <footer className="mainPanel">
            <nav>
                <span ><Link href='/'><Image className="HeaderList" src={iconProfile} /></Link></span>
                <span ><Link href='/posts'><Image className="HeaderList" src={iconHome} /></Link></span>
                <div ref={navigateRef} className="navigate"></div>
            </nav>
        </footer>
        </>
    )
}