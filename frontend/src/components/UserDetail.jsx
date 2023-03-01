import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

export const UserDetail = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalpages, setTotalPages] = useState(1)
    const [data, setData] = useState(null)
    const [gender, setGender] = useState('')
    const [totalUser, setTotalUser] = useState(0)

    const getData = async (page = 1) => {
        try {

            let res = await axios.get(`http://localhost:3500/allusers?page=${page}&gender=${gender}`);
            if (res.data.data.length > 0) {
                setData(res.data.data)
                setTotalPages(res.data.totalPages)
                setTotalUser(res.data.TotalDataCount)
            }

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    }, [gender])




    let items = [];
    for (let number = 1; number <= totalpages; number++) {
        items.push(
            <Pagination.Item key={number} onClick={() => {
                if (number != currentPage) {
                    getData(number)
                }
                setCurrentPage(number)
            }} active={number === currentPage}>

                {number}
            </Pagination.Item>,
        );
    }

    const handleFilterChange = (event) => {
        setGender(event.target.value);
    }


    return (<>
        <Button variant="danger" id="backButton" ><Link to="/" className="link" >Go Back</Link></Button>{" "}
        <h1>User Details</h1><br />

        {/* filter */}

        <div className="filter">
            <div>
                {/* total user */}
                <i> Total Users : <strong>{totalUser}</strong></i>
            </div>
            <div>
                filter by Gender : &nbsp;<Form.Select className="filterSelect" size="sm" onChange={handleFilterChange} >
                    <option value="" >All</option>
                    <option value="male" >Male</option>
                    <option value="female" >Female</option>
                </Form.Select>
            </div>
        </div>

        {/* table */}

        <div style={{ width: '95%', margin: 'auto' }}>
            <div>
                <Table bordered hover striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Nat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((e, i) => {
                            return <tr key={i}>
                                <td>{i}</td>
                                <td>{e.name.title + " " + e.name.first + " " + e.name.last}</td>
                                <td>{e.gender}</td>
                                <td>{e.email}</td>
                                <td>{e.location.country}</td>
                                <td>{e.nat}</td>
                            </tr>
                        })
                            : <tr><td colSpan={6} >No Recond</td></tr>
                        }
                    </tbody>

                </Table>
            </div>


            {/* pagination */}
            <div className="pagination" >
                <Pagination>
                    <Pagination.First onClick={() => {
                        setCurrentPage(p => {
                            if (p != 1) {
                                getData(p)
                                return p - 1;
                            }
                            else return p
                        })
                    }} />
                    {items}
                    <Pagination.Last onClick={() => {
                        setCurrentPage((p) => {
                            if (p < totalpages) {
                                getData(p)
                                return p + 1
                            }
                            else return p
                        })
                    }} />
                </Pagination>
            </div>


        </div>

    </>)
}
