import { useEffect, useState } from 'react';

export default function useRole(uid) {
    const [role, setRole] = useState('');

    useEffect(() => {
        if (uid) {
            fetch(`https://book-server-six.vercel.app/get-user-role/${uid}`, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            }).then((res) => {
                res.json().then((upRes) => {
                    if (upRes?.success) {
                        setRole(upRes.message);
                    }
                });
            });
        }
    }, [uid]);

    return [role];
}
