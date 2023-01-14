import { useState, useEffect } from "react";
const accessToken ="BQDtH_RE9ZUtzgTwGHCl7ODBAPRE2KItAsQ4fp3El6_41TcOkc52UcaPmsLzWwZ71FmhpgxyCI4zbA2C6A1pLqjxaP0z3rbLWM8wjX3NF8KSP-SbJy1OT-gE930bdiqiYS-PdkB8soC3PnjGuqCocGIAhfm41yuZaRYosJm4yw4OfrK6HFL7mjgZG4N7DpKQ8QBpGcipjA_vm-3m7An46eSBP9LUulMa4po0UUX5FhvnmpEWWeuttCNFGsI1UL4itGfgiGMEvtFYpMdT";

const Song = () => {
    const [songs, setSongs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [artistId, setArtistId] = useState("");

    const handleChange = (event) => {
      setSearchInput(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      var artistParams = {
          headers: {
              'Authorization': 'Bearer ' + accessToken
          }
      }

      var artistsID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, artistParams)
      .then(response => response.json())
      .then(data => {
        setArtistId(data.artists.items[0].id);
      });
  };

  useEffect(() => {
    if(artistId){
        fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        ).then((response) => response.json())
        .then((data) => {
            setSongs(data.items);
            console.log(data.items);
        });
    }
}, [artistId]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Search Artist</h1>
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <input class="form-control" type="text" value={searchInput} onChange={handleChange} placeholder="Artist" style={{width: "350px", margin: '20px'}}/>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-secondary">Search</button>
          </div>
        </div>
      </form>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">TITLE ALBUMS</th>
            <th scope="col">RELEASE DATE</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>
                <img
                  src={song.images && song.images[0].url}
                  alt="Album cover"
                  style={{ height: "80px", margin: "10px" }}
                />
                {song.name}
              </td>
              <td>{song.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Song;
