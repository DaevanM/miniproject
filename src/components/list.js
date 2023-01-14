import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
    const [lists, setLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        const response = await fetch('http://localhost:8080/list');
        const data = await response.json();
        setLists(data);
    }

    const deleteList = async(id) => {
        await fetch(`http://localhost:8080/list/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetchData();
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = lists.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(lists.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div>
            <Link to={'/'}><button class="btn btn-secondary" style={{margin: '20px'}}>Home</button></Link>
            <table className="table table-dark table-striped">
                <thead>
                <tr>
                    <th scope="col">TITLE ALBUMS</th>
                    <th scope="col">RELEASE DATE</th>
                    <th scope="col">ARTIST</th>
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((list) => (
                    <tr key={list.songs.id}>
                    <td>
                        <img
                        src={list.songs.images && list.songs.images[0].url}
                        alt="Album cover"
                        style={{ height: "80px", margin: "10px" }}
                        />
                        {list.songs.name}
                    </td>
                    <td>{list.songs.release_date}</td>
                    <td>{list.songs.artists[0].name}</td>
                    <td>
                        <button onClick={() => deleteList(list.id)} button class="btn btn-danger">Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pageNumbers.map((number) => (
                        <li key={number} className={ number === currentPage ? "page-item active" : "page-item"}>
                            <button className="page-link" onClick={() => setCurrentPage(number)}> {number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default List;