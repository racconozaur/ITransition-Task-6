import axios from 'axios'


export const registration = async (name) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            name
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const send = async (sender, rciever, title, content) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/send`, {
            sender, rciever, title, content
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

// export const registration =  (name) => {
//     return async dispatch => {
//         try {
//             const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
//                 name
//             })
//             dispatch(setUser(response.data.user))
//         } catch (e) {
//             alert(e.response.data.message)
//         }
//     }
// }