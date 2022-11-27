import { useEffect, useState } from 'react';

export default function useRole(uid) {
    const [role, setRole] = useState('');

    useEffect(() => {
        if (uid) {
            fetch(`http://localhost:5000/get-user-role/${uid}`).then((res) => {
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
