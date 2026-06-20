import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { FaCheck } from "react-icons/fa";
import { FaFaceSadCry } from "react-icons/fa6";
import { clearError } from '../../logic/clearError';
import './ResultTable.css';

function ResultTable() {
    
    const [results, setResults] = useState([]);
    const [fetchError, setFetchError] = useState('');

    /* Retrieves result games of the user from server */
    useEffect(() => {
        const fetchResults = async () => {
            clearError(setFetchError);
            try {
                const response = await fetch(
                    "http://localhost:3001/api/games",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if(!response.ok){
                    setFetchError(response.error || "Get game results failed for unknown reason");
                    return;
                }
                const data = await response.json();
                setResults(data);
            } catch (err) {
                setFetchError("Server unavailable");
                console.error(err);
            }
        };

        fetchResults();
    }, []);

    if(fetchError){
        return <Container className='validation-error d-flex align-items-center justify-content-center py-2'>{fetchError}</Container>   
    }

    if (results.length === 0) {
        return (
            <Container className="custom-text d-flex justify-content-center align-items-center">
                <p>No game results found!</p>
            </Container>
        );
    }

    return (
        <Table className="result-table text-center mx-2 mx-md-4 mx-lg-5 mt-3 w-100">
            <thead>
                <tr>
                    <th>WON</th>
                    <th>DEPARTURE</th>
                    <th>DESTINATION</th>
                    <th>SCORE</th>
                    <th>DATE</th>
                </tr>
            </thead>

            <tbody>
                {results.map((result) => (
                    <tr key={result.game_id}>
                        <td>{result.won ? <FaCheck /> : <FaFaceSadCry />}</td>
                        <td>{result.start_station}</td>
                        <td>{result.destination_station}</td>
                        <td>{result.score}</td>
                        <td>
                            {new Date(result.played_at).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ResultTable;