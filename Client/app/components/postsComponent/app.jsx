'use client'
import {useState, useEffect} from 'react'
import Posts from './AllPosts'
import FormAddUser from './AddUserPost'
import { Provider } from './provider'


const AppPost = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
                
        const fetchMessages = async () => {
            await fetch('http://localhost:3001/api/get-messages/' + null)
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
                longPollingFetchMessages()
            })
            .catch((err) => {
                console.log(err);
                setTimeout(() => {
                    longPollingFetchMessages()
                }, 500)
            })
        
        }

        const longPollingFetchMessages = async () => {
            await fetch('http://localhost:3001/api/get-messages-long-polling/' + null)
            .then((res) => res.json())
            .then((data) => {setMessages(data);longPollingFetchMessages()})
            .catch((err) => {
                console.log(err);
                setTimeout(() => {
                    longPollingFetchMessages()
                }, 500)
            })
        }
        
        fetchMessages(); // Вызов функции для получения данных
    }, []);

    return (
        <section>
            <Provider messages={messages}>
                <FormAddUser setMessages={setMessages}/>
                <Posts />
            </Provider>
            
                
        </section>
    )
    
}

export default AppPost