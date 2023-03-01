import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export const Home = () => {
    const [status, setStatus] = useState(null)
    const [fetchError,setFetchError] = useState(null)


    const fetchData = () => {
        setStatus('...Fetching Data from Api')
        axios.get('https://randomuser.me/api/?results=50&inc=name,gender,nat,location,email&noinfo')
            .then((res) => {
                setStatus('...Fetching Data Completed')
                console.log('get request success');
                SaveData(res.data.results)
            })
            .catch((err) => {
                setStatus('Geting Error to Fetching Data and Error: ' + err.message)
                console.log('get request failed');
                console.error(err);
            })
    }

    function SaveData(payload){
        setStatus('...Saving Data to Server');
        axios.post('http://localhost:3500/addusers', payload)
        .then((res) => {
            setStatus('Data successfully saved to Server');
            console.log('post request success');
            console.log(res.data);
        })
        .catch((err) => {
            setStatus('Geting Error Saving Data to Server and Error: ' + err.message)
            console.log('post request failed');
            console.error(err);
        })
    }

    const DeleteData = async()=>{
        try {
            setStatus('...Deleting Data from Server');
            const response = await axios.delete('http://localhost:3500/deleteAllUsers')
            setStatus('Deleted all Data');

          } catch (error) {
            setStatus('Geting Error to deleting Data and Error :' + error.message)
          }
    }

    const ThrowFetchError = ()=>{
        setFetchError('Already some data fetch is going on')
        let timer = setTimeout(()=>{
            setFetchError(null)
        },1000)
    }

    return (<>
        <h1>Home</h1>
        <div>
            <Button variant="success" onClick={()=>{
                if(status === '...Fetching Data from Api' || status === '...Fetching Data Completed' || status === '...Saving Data to Server' || status === '...Deleting Data from Server'){
                    ThrowFetchError()
                }else fetchData();
            }} >Fetch Users</Button>{" "}

            <Button variant="danger" onClick={DeleteData} >Delete Users</Button>{" "}

            <Button variant="primary" onClick={()=>setStatus(null)}  ><Link className='link' to="/userdetails" >User Datails</Link></Button>{" "}
        </div>

        {fetchError ? <p style={{color:"red"}} >{fetchError}</p> : null}
        <br /><br />

        
         
        <h2 >{status}</h2>
        

    </>)
}
