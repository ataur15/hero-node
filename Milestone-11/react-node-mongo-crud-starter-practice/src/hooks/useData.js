import { useEffect, useState } from "react";

const useData = () => {
    const [users, setUsers] = useState([]);
    // const [trigger, setTrigger] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/users/`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users]);

    return [users, setUsers]
}

export default useData;