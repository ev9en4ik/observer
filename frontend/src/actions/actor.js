import axios from 'axios'
export const searchActor = async inputValue => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/actor/searchActor',
            { inputValue },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        const actors = response.data.actors

        return actors
    } catch (e) {
        return e.response
    }
}
export const findActorById = async id => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/actor/findActorById/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        const actor = response.data.actor
        return actor
    } catch (e) {
        return e.response
    }
}
