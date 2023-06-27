import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            await axios
                .get(`http://localhost:3000/users`, {
                    withCredentials: true,
                })
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getUsers();
    }, []);
    return (
        <div>
            <h1>Home</h1>
            <h1>Liste des utilisateurs</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>Email : {user.email}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Home;
