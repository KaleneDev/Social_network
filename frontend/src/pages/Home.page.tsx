import { useState, useEffect } from "react";
import axios from "axios";
import "../style/components/pages/home.scss";

interface User {
    id: number;
    name: string;
    email: string;
}

function Home() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            await axios
                .get<User[]>(`${import.meta.env.VITE_APP_URL}users`, {
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
        <>
            <div className="home">
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
        </>
    );
}

export default Home;
