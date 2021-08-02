import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './UserList.scss';

function UserList(props) {
    const [usersData, setusersData] = useState([]);
    const [displayUsersOnPage, setDisplayUsersOnPage] = useState([]);
    const [sortImage, setSortImage] = useState('./media/sort-asc.png');
    const [pageNumber, setPageNumber] = useState(0);
    const maxUsersPerPage = 24;
    let serialNumber = 0;
    const totalUsers = usersData.length;
    const pageCount = Math.ceil(totalUsers / maxUsersPerPage);
    const history = useHistory();

    useEffect(() => {
        console.log('use effect fetch data');
        axios.get('https://randomuser.me/api/?results=100')
            .then(res => {
                console.log(res.data.results);
                const userData = res.data.results;
                const displayUserOnPage = userData.slice(0, maxUsersPerPage);
                setusersData(userData);
                setDisplayUsersOnPage(displayUserOnPage);
            });
    }, []);

    const changePageHandler = (selected) => {
        const usersVisited = selected * maxUsersPerPage;
        setPageNumber(selected);
        setDisplayUsersOnPage(usersData.slice(usersVisited, usersVisited + maxUsersPerPage));
    }

    const sortUsersHandler = () => {
        if (sortImage === './media/sort-asc.png') {
            const sortedUsers = [...displayUsersOnPage].sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
            setDisplayUsersOnPage(sortedUsers);
            setSortImage('./media/sort-desc.png');
        }
        else {
            const sortedUsers = [...displayUsersOnPage].sort((a, b) => (a.name.first < b.name.first ? 1 : -1));
            setDisplayUsersOnPage(sortedUsers);
            setSortImage('./media/sort-asc.png');
        }

    }

    const userDetailsHandler = (userPhoneNum) => {
        history.push(`/userDetails/${userPhoneNum}`);
    }


    const displayUsers = displayUsersOnPage
        .map((user, index) => {
            serialNumber = serialNumber + 1;
            return <tr key={index} onClick={() => userDetailsHandler(user.phone)}>
                <td>{serialNumber}</td>
                <td>{user.name.first + ' ' + user.name.last}</td>
                <td><img src={user.picture.thumbnail} alt={user.name.first} /></td>
            </tr>
        })



    return (
        <>
            <Table striped bordered hover className={' w-60 mx-auto my-5 text-center '}>
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Name
                            <img src = {sortImage} alt = 'sort'  height='25px' onClick = {sortUsersHandler} />
                        </th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers}
                </tbody>
            </Table>
            <ReactPaginate
                previousLabel='Previous'
                nextLabel='Next'
                pageCount={pageCount}
                onPageChange={changePageHandler}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </>

    );
}

export default UserList;