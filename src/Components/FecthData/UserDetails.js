import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import './UserDetails.scss';


const UserDetails = () => {

    const [userData, setUserData] = useState({});
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        axios.get('https://randomuser.me/api/', { params })
            .then(res => {
                setUserData(res.data.results[0]);
            })
    }, [])

   const backButtonHandler = () => {
        history.push('/');
    }

    let displayUserData = '';
    if (Object.keys(userData).length) {
        displayUserData = (<div className=' text-center'>
            <div><img src={userData.picture.large} alt={userData.name.first} /></div>
            <div className='row mt-4 text-left'>
                <div className='col-3 offset-1'><label><h5>Name</h5></label></div>
                <div className='col-1'><label><h5>:</h5></label></div>
                <div className='col-6'><h5>{userData.name.first + ' ' + userData.name.last}</h5></div>
            </div>
            <div className='row mt-1 text-left'>
                <div className='col-3 offset-1'><label><h5>Email-ID</h5></label></div>
                <div className='col-1'><label><h5>:</h5></label></div>
                <div className='col-6 '><h5>{userData.email}</h5></div>
            </div>
            <div className='row mt-1 text-left'>
                <div className='col-3 offset-1'><label><h5>Phone</h5></label></div>
                <div className='col-1'><label><h5>:</h5></label></div>
                <div className='col-6 '><h5>{userData.phone}</h5></div>
            </div>
            <div className='row mt-1 text-left'>
                <div className='col-3 offset-1'><label><h5>Gender</h5></label></div>
                <div className='col-1'><label><h5>:</h5></label></div>
                <div className='col-6  text-capitalize'><h5>{userData.gender}</h5></div>
            </div>
            <div className='row mt-1 text-left'>
                <div className='col-3 offset-1'><label><h5>DOB</h5></label></div>
                <div className='col-1'><label><h5>:</h5></label></div>
                <div className='col-6 '><h5>{userData.dob.date}</h5></div>
            </div>
            <div className='row mt-1 text-left' >
                <div className='col-3 offset-1'><label><h5>Age</h5></label></div>
                <div className='col-1'><label><h5>:</h5></label></div>
                <div className='col-6 '><h5>{userData.dob.age}</h5></div>
            </div>
        </div>)
    } else {
        displayUserData = 'Loading...'
    }

    return (
        <>
            <Button size='sm' className=' w-10 float-right m-3'
                onClick={backButtonHandler}>
                Back
            </Button>
            <Card className='w-50 mx-auto'>
                <Card.Header className='Header'>User Details</Card.Header>
                <Card.Body>
                    {displayUserData}
                </Card.Body>
            </Card>
        </>
    );
}

export default UserDetails;