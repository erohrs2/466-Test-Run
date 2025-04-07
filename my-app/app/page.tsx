'use client';
import { useState, useEffect } from 'react';

export default function Home() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');

    const fetchUsers = async () => {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data.users);
    };

    const addUser = async () => {
        await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setName('');
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <main style={{ padding: 20 }}>
            <h1>Users</h1>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
            />
            <button onClick={addUser}>Add User</button>
            <ul>
                {users.map((u: any) => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
        </main>
    );
}
