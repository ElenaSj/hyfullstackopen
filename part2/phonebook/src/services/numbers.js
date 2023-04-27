import axios from "axios";

const url=`/api/persons`

const getAll = () => {
    return axios.get(url)
}

const create = newPerson => {
    return axios.post(url,newPerson)
}

const update = (id, person) => {
    return axios.put(`${url}/${id}`, person)
}

const remove = id => {
    return axios.delete(`${url}/${id}`)
}

module.exports = {getAll, create, update, remove}