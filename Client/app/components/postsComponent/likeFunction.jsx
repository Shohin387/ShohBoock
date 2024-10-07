
const axios = require('axios').default

export default function likeFn(messageId, plus) {
    const plusLike = () => {
        try {
            axios.post('http://localhost:3001/api/like', {
                id: JSON.parse(localStorage.getItem('dataUser')).id,
                postsId: messageId,
                plus: plus
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    plusLike()
}