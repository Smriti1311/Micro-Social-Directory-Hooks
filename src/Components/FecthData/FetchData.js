import React, { useState , useEffect} from 'react';
import axios from 'axios';
import UserList from './UserList';

const FetchData = () => {
    const [userData, setuserData] = useState([]);
    console.log('in fetch dta');

    useEffect(() => {
        console.log('use effect fetch data');
        axios.get('https://randomuser.me/api/')
        .then(res=>{
            console.log(res.data.results[0]);
            setuserData(res.data.results[0]);
        });
    },[]);
    

    return (
        <div>
            <UserList userData = {userData} />
        </div>
    );
}

export default FetchData;