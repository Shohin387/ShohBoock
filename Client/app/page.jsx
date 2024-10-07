
import { MainPanel } from './components/postsComponent/mainPanel';
import Header from "./components/postsComponent/header";
import LinkForReg from "./components/postsComponent/LinkForReg";
import Link from "next/link";
import PostsUser from './components/profileComponents/postsUser';



export default function Page() {
  return (<>
    
    <Header /> 
    <h1>Мои посты</h1> 
    <PostsUser />
    <MainPanel />
    
    <LinkForReg />
    
    
    </>);
}
