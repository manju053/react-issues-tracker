import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { deleteIssue, getIssues } from '../services/apiService'; 
import { useHistory } from 'react-router-dom';
import { setToken } from '../services/api';
import { useGlobalContext } from '../context';
const IssuesList = () => {
    setToken(localStorage.getItem('jwtToken'));
    let history = useHistory();
    const {setIsEditing, setEditID} = useGlobalContext();
    const [data, setData] = React.useState([]);
    const [rows, setRows] = React.useState(data);
    const [filterTerm, setFilterTerm] = React.useState('All');
    const [filterOptions, setFilterOptions] = React.useState([]);

    const fetchIssues = async () => {
        
        const response = await getIssues();
        setData(response.data)
        setRows(response.data);
        setFilterOptions(Array.from(new Set(response.data.map(row => row.status))));
    }
    useEffect( async () => {
        fetchIssues();
    }, []);

    useEffect(() => {
        let newRows = data;
        if(filterTerm !== 'All') {
            newRows = newRows.filter(row => row.status === filterTerm);
        }
        setRows(newRows);
    }, [filterTerm]);

    const removeIssue = (id) => {
        deleteIssue(id).then(response => {
            fetchIssues();
        })
        .catch(error => {
            window.alert("Error deleting the issue");
        })
    };

    const editIssue = (id) => {
        setIsEditing(true);
        setEditID(id);
        history.push(`/home/edit/${id}`);
    }
    return (
        <main>
            <div className="actions">
                <button className="create-btn" onClick={() => history.push('/home/create')}>create new issue</button>
                <select value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)}>
                    <option value="" hidden>Select</option>
                    {
                        filterOptions.map((option, index) => {
                            return <option value={option} key={index}>{option}</option>
                        })
                    }
                    <option value="All" >All</option>
                </select>
            </div>

            {/* <TableContainer  className="table-container"> */}
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Asignee</TableCell>
                        <TableCell align="center">Severity</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="center">{row.responsible}</TableCell>
                            <TableCell align="center">{row.severity}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">
                                <button className="action-btn" title="Edit" onClick={() => editIssue(row._id)}><AiFillEdit /></button>
                                <button className="action-btn" title="Delete" onClick={() => removeIssue(row._id)}><AiOutlineDelete /></button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* </TableContainer> */}
        </main>
    )
}

export default IssuesList;