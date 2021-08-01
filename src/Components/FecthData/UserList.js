import React from 'react';
import { Table } from 'react-bootstrap';
import UserDetails from './UserDetails';
import { Link, Switch, Route } from 'react-router-dom';

function UserList(props) {
    const userData = props.userData;
    console.log(userData);
    const { title, first, last } = userData.name;
    const userName = title + ' ' + first + ' ' + last;
    const imgSrc = userData.picture.thumbnail;
    //console.log(imgSrc);
    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S. No</th>
                    <th>Name</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
            <tr as={Link} to='/userDetails'>
                    <td>1</td>
                    <td>{userName}</td>
                    <td><img src={imgSrc} alt={userName} /></td>
                </tr>
             
            </tbody>


        </Table>
        <Switch>
            <Route path='/userDetails' component={UserDetails}/>
        </Switch>
        </>

    );
}

export default UserList;