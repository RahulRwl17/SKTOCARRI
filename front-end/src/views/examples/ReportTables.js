import React, { useEffect, useState } from 'react';
import Header from "../../components/Headers/Header";
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
import { getAllUsers } from "../../network/ApiAxios";
import axios from 'axios';

const ReportTables = (props) => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(25);

    useEffect(() => {
        const runAsync = async () => {
            const response = await getAllUsers();
            const { users } = response.data;
            console.log(users);
            if (response.data.success) {
                setUsers(users);
            }
        }
        runAsync();
    }, []);

    const Pending = () => {
        return (
            <>
                <i className="bg-danger" />
                Pending
            </>
        )
    }
    const Approved = () => {
        return (
            <>
                <i className="bg-green" />
                Approved
            </>
        )
    }



    const UserList = ({ users }) => {
        return (
            users.map((user) => {
                return (
                    <tr style={{ cursor: 'pointer' }} key={user._id} onClick={() => {
                        props.history.push({
                            pathname: "/admin/user-profile/",
                            state: user._id
                        })
                    }}>
                        <th scope="row">
                            <Media className="align-items-center">
                                <a
                                    className="avatar rounded-circle mr-3"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <img
                                        alt="..."
                                        src={'http://172.105.61.90:5100' + user.photo}
                                    />
                                </a>
                                <Media>
                                    <span className="mb-0 text-sm">
                                        {user.email}
                                    </span>
                                </Media>
                            </Media>
                        </th>
                        <td>{user.fname + ' ' + user.lname}</td>
                        <td>
                            <Badge color="" className="badge-dot mr-4">
                                {

                                    user.accountConfirmation ? <Approved /> : <Pending />
                                }
                            </Badge>
                        </td>
                    </tr>
                )
            })

        )
    }




    const PaginationComponent = ({ totalUsers, usersPerPage, paginate, currentPage }) => {

        const PageNumber = [];
        for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
            PageNumber.push(i);
        }

        return (
            <CardFooter className="py-4">
                <nav aria-label="...">
                    <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                    >

                        {
                            PageNumber.map((number) => {
                                return (
                                    <PaginationItem key={number} className={currentPage === number ? "active" : ""}>
                                        <PaginationLink onClick={() => paginate(number)} >
                                            {number}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                    </Pagination>
                </nav>
            </CardFooter>

        )

    }
    const paginate = pageNumber => setCurrentPage(pageNumber)


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

    const getUrl = async () => {
        return await axios('https://rectgujarat.org/uploads/RECT_HOR.png', {
            method: "GET",
            headers: { Authorization: 'Bearer eyJhbGciOiJIU' }
        }).then((response) => {
            // const data = `data:${response.headers['content-type']};base64,${new Buffer(response.data).toString('base64')}`
            // const file = new file(data, 'myImage.png')
            // const data = `${new Buffer(response.data, "binary").toString("base64")}`;
            var blob = new Blob([new Buffer(response.data)], { type: response.headers['content-type'] })
            var imageUrl = URL.createObjectURL(blob);
            console.log(blob);
            return imageUrl
        });

    }


    return (
        <>
            <Header />
            <Container>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Reports Table</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Last Users</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Status</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    <UserList users={currentUsers} />
                                </tbody>
                            </Table>
                            <img
                                alt="..."
                                src={getUrl()}
                            />
                            <PaginationComponent totalUsers={users.length} currentPage={currentPage} usersPerPage={usersPerPage} paginate={paginate} />
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default ReportTables;
