
import AppPost from "../components/postsComponent/app"
import Header from "../components/postsComponent/header"
import Link from "next/link"
import LinkForReg from "../components/postsComponent/LinkForReg"
import { MainPanel } from "../components/postsComponent/mainPanel"


export default function posts() {

    return(
        <div>
            <LinkForReg/>
            <Header /> 
            <AppPost /> 
            <MainPanel />
            
        </div>
    )
}