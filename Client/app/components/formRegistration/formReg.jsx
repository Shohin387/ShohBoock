'use client'
import { useState, useEffect } from 'react'
import {useRouter} from 'next/navigation'
import '../style/styleForRegForm/styleFormReg.css'
const axios = require('axios').default

export default function FormReg() {
    const [result, setResult] = useState('')
    const router = useRouter()
    const submitData = async (event) => {
        
        event.preventDefault()
        axios.post(actions, {
            userName: userDate.name,
            email: userDate.email,
            password: userDate.pass,
            time:new Date().getDate()
        })
          .then(res => {
            
            
            if (!localStorage.getItem('dataUser')) {
                localStorage.setItem('dataUser', JSON.stringify({
                    id: res.data.dataUser._id, 
                    name: res.data.dataUser.userName, 
                    email: res.data.dataUser.email, 
                    password: userDate.pass
                }))
            }
            router.push('/')
        })
          .catch(error => {
            setResult(error.response.data.err); 
            console.log(error.response);
            console.log(result)
        })

    }


    //Такой же говнокод
    const [borderBlockReg, setBorderBlockReg] = useState("40px 0 0 40px")
    const [positionLeft, setPositionLeft] = useState("250px")
    const [classButton, setClassButton] = useState({LogIn: 'button', Reg: 'RegLabel activeButton'})
    const [userDate, setUserDate] = useState({name: '', pass:'', email: ''})
    const [actions, setActions] = useState('http://localhost:3001/api/registration')
    
    
    const setStateRegBlock = () => {
        setBorderBlockReg('0 40px 40px 0');
        setPositionLeft('0px')
        setClassButton({LogIn:"activeButton", Reg:'RegLabel button'})
        setActions('http://localhost:3001/api/LogIn')
    }

    const defStateBlockReg = () => {
        setBorderBlockReg('40px 0px 0px 40px');
        setPositionLeft('250px')
        setClassButton({LogIn:"button", Reg:'RegLabel activeButton '})
        setActions('http://localhost:3001/api/registration')

    }

    return(
        <section id='MainBlockForReg'>
            <button onClick={setStateRegBlock} type='button' className={classButton.LogIn} id='LogIn'>Войти</button>
            <button onClick={defStateBlockReg} className={classButton.Reg}>Регестрация</button>
            <form method='post' onSubmit={submitData} style={{borderRadius:borderBlockReg, left:positionLeft}} action={actions}>
                <label className='styleLabel'  htmlFor="userName">Придумайте имя</label>
                <input name='userName' onChange={(ev) => setUserDate({...userDate, name: ev.target.value})} type="text" placeholder='Введите свое имя'/><br />
                <label className='styleLabel' htmlFor="email">Введите свой Email</label>
                <input name='email' onChange={(ev) => setUserDate({...userDate, email: ev.target.value})} type="email" placeholder='Ввндитн свой email'/><br />
                <label className='styleLabel' htmlFor="password">Введите пароль</label>
                <input name='password'  onChange={(ev) => {setUserDate({...userDate, pass: ev.target.value})}} type="password" placeholder='Введите пароль'/>
                <button className='button' id='RegButton' onClick={() => actions.includes('registration') ? userDate.email.length > 1 && userDate.pass.length > 1 && userDate.name.length > 1  ? alert("А теперь войди в свой аккаунт") : alert('Заполните все поля') :[]} type={userDate.name.length > 1 && userDate.email.length > 1 && userDate.pass.length > 1 ? 'submit' : "button"}>Авторизоваться</button>
                <br /><b style={{color: 'red'}}>{result}</b>
            </form>
        </section>
    )
}
