import userService from "../services/users"
import { useState, useEffect } from "react"

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(users => setUsers(users))
    }, [])

    return (
        <div>
            <h4>Users</h4>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                </thead>
                <tbody>
            {users.map(user =>
            <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default Users