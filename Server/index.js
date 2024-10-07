const express = require('express')
const {MongoClient, ObjectId, AggregationCursor} = require('mongodb')
const cors = require('cors')
const CryptoJs = require('crypto-js')
const bodyParser = require('body-parser')
const events = require('events')


const emiter = new events.EventEmitter()
const client = new MongoClient('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0')
const app = express()
let timeHour = new Date().getHours()
let timeMin = new Date().getMinutes()
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials:true
}))//настройка cors
app.use(express.json())// Настройка прокси
app.use(express.urlencoded({extended: false})) //разрешение боди парсера\


//Подключение к базе данных

const connectToDB = async () => {
    try {
        await client.connect()
        console.log('Подключение прошло успешно')
    } catch (err) {
        console.log(err)
    }
}

connectToDB()


//Функция дл полученяи данных
const getData = async (req, res, id=null, checkAcount=null) => {
    try {
        const users = client.db().collection('users')
        if (id === 'null') {
            const findData = await users.find().sort('posts.0.day').toArray()
            let messages;
            if (findData)
                messages = findData.flatMap(user => user.posts.map(post => (post)))

            const messRev = messages.reverse()
            return res.status(200).json(messRev)
        } else {
            if (checkAcount === 'user') {
                const findData = await users.find({_id: new ObjectId(id)}).toArray()
                findData.map(el => {
                    console.log(el)
                })
                
                let messages;
                if (findData)
                    messages = findData.flatMap(user => user.posts.map(post => (post)))

                const messRev = messages.reverse()
                return res.status(200).json(messRev)
            } else if (checkAcount === 'friend') {
                const findData = await users.find({"posts._id": new ObjectId(id)}).toArray()
                findData.map(el => {
                    console.log(el)
                })
                
                let messages;
                if (findData)
                    messages = findData.flatMap(user => user.posts.map(post => (post)))

                const messRev = messages.reverse()
                return res.status(200).json(messRev)
            }
            
        }
        
            
    } catch (err) {
        res.status(500).json({err: err.message, "Ошибка ":"Ошибка с подклюением"})
        return console.log(err)
    }
}


//Лайки ..........
app.post('/api/like', async (req, res) => {
    try {
        const users = client.db('test').collection('users')
        await users.updateOne({ "posts._id":new  ObjectId(req.body.postsId)}, {$inc: {"posts.$.countLike": req.body.plus}})
        console.log('success', req.body.postsId, req.body.id)
    } catch (error) {
        console.log(error)
    }
})


//Добвление постов 
app.post('/api/addPosts', async (req, res) => {
    console.log(req.body)
    let post = req.body.post


    try {
        const users = client.db().collection('users')
        const userName = await users.findOne({_id: new ObjectId(req.body.userId)}, {projection: {userName: 1, _id: 0}})
        await users.updateOne({_id: new ObjectId(req.body.userId)}, {$push: {posts: {
            _id: new ObjectId(),
            userName: userName.userName,
            message: post,
            countLike: 0,
            timeHour: timeHour,
            timeMin: timeMin,
            month: new Date().getMonth(),
            day:  new Date().getDate()
        }}})

        const resData = await getData(req, res)
        emiter.emit('newMessage', resData)
        

    } catch (error) {
        console.log(error)
    } 
})

//получение постов
app.get('/api/get-messages/:id', async (req, res) => {
    console.log(req.url)
    await getData(req, res, req.params.id, 'friend')

})

app.get('/api/get-data-user/:id', async (req, res) => {
    console.log(req.url)
    await getData(req, res, req.params.id, 'user')

})


app.get('/api/get-messages-long-polling/:id', async (req, res) => {
    emiter.once('newMessage', async () => {
        await getData(req, res, req.params.id, 'friend')
    })

})




//Система регестраций
app.post('/api/registration', async (req, res) => {
    try {
        const userName = req.body.userName
        const users = client.db('test').collection('users')
        const CheckUser = await users.findOne({userName: userName})

        if(CheckUser) {
            console.log("Не игнор условия")
            return res.status(401).send({err: 'Это имя уже занято'})
        }

        console.log("Игнор условия(")
        
        const hashPass = CryptoJs.SHA256(req.body.password).toString(CryptoJs.enc.Hex)
        await users.insertOne({userName: req.body.userName, email: req.body.email, password: hashPass, posts:[]})
        return res.status(200).send({dataUser: await users.findOne({userName: userName})}).redirect('http://localhost:3000/')
    } catch (err) {
        console.log(err)
    }
})


app.post('/api/LogIn', async (req, res) => {
    try {
        const userName = req.body.userName
        const users = client.db('test').collection('users')
        const hashPass = CryptoJs.SHA256(req.body.password).toString(CryptoJs.enc.Hex)
        const CheckUser = await users.findOne({userName: userName})
        if (!CheckUser) {
            return res.status(401).send({err: 'Не верный логин или пароль'})
        }
        else {
            if (hashPass === CheckUser.password) {
                console.log('Yes')
                if(!req.body.loadPageChack)
                    return res.status(200).send({dataUser: await users.findOne({userName: userName})}).redirect('http://localhost:3000/')
                else{
                    res.send('')
                }
            }
            else if (hashPass !== CheckUser.password) {
                return res.status(401).send({err: 'Не верный пароль'})
            }
        }

        
    } catch (err) {
        console.log(err)
    } 
})




app.listen(3001, "localhost", () => {
    console.log('Сервер запущен по URL: localhost:3001')
})
