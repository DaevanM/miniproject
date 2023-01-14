import { useState } from "react";
import List from "./list";
import { Link } from "react-router-dom";
const accessToken ="BQDtH_RE9ZUtzgTwGHCl7ODBAPRE2KItAsQ4fp3El6_41TcOkc52UcaPmsLzWwZ71FmhpgxyCI4zbA2C6A1pLqjxaP0z3rbLWM8wjX3NF8KSP-SbJy1OT-gE930bdiqiYS-PdkB8soC3PnjGuqCocGIAhfm41yuZaRYosJm4yw4OfrK6HFL7mjgZG4N7DpKQ8QBpGcipjA_vm-3m7An46eSBP9LUulMa4po0UUX5FhvnmpEWWeuttCNFGsI1UL4itGfgiGMEvtFYpMdT";

const Add = () => {
    const [albumName, setAlbumName] = useState("");
    const [artistName, setArtistName] = useState("");

    const handleAlbumChange = (event) => {
        setAlbumName(event.target.value);
    };

    const handleArtistChange = (event) => {
        setArtistName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        var searchParams = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        var searchResults = await fetch(`https://api.spotify.com/v1/search?q=album:${albumName}+artist:${artistName}&type=album`, searchParams)
        .then(response => response.json())
        .then(data => { 
            return data.albums.items[0] 
        });
        
        const myJson = {
            "songs": searchResults
        }
        
        const options = {
            method: 'POST',
            body: JSON.stringify(myJson),
            headers: { 
                'Content-Type': 'application/json' 
            }
        };
        
        await fetch('http://localhost:8080/list', options)
        .then(res => res.json())
        .then(json => console.log(json));
    };
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Add Albums</h1>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <input class="form-control" type="text" value={albumName} onChange={handleAlbumChange} placeholder="Album Name" style={{width: "350px", margin: '20px'}}/>
                    </div>
                    <div class="col-auto">
                        <input class="form-control" type="text" value={artistName} onChange={handleArtistChange} placeholder="Artist Name" style={{width: "350px", margin: '20px'}}/>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-secondary">Add</button>
                    </div>
                </div>
                <div class="col-auto">
                    <Link to={'/list'}><button class="btn btn-secondary" style={{margin: '20px'}}>List</button></Link>
                </div>
            </form>
        </div>
    )
};


export default Add;