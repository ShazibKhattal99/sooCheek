import React, { useState, useEffect } from "react";
import "./css/Artist.css";

function Artist() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState("");
  const [filterCity, setFilterCity] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/backhouse/artistUser/artists"
        );
        const data = await response.json();
        if (response.ok) {
          setArtists(data.artists || []);
        } else {
          setError(data.message || "Failed to fetch artist data");
        }
      } catch (err) {
        setError("An error occurred while fetching artist data");
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  // Handle search inputs
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleSearchIdChange = (e) => setSearchId(e.target.value.toLowerCase());
  const handleFilterChange = (e) => setFilterCity(e.target.value);

  // Filter artists based on City, Skills, and Artist ID
  const filteredArtists = artists.filter((artist) => {
    const matchesCity = filterCity === "All" || artist.city === filterCity;
    const matchesSkill =
      searchTerm === "" ||
      (Array.isArray(artist.skills) &&
        artist.skills.some(
          (category) =>
            Array.isArray(category.skills) &&
            category.skills.some((skill) =>
              skill.toLowerCase().includes(searchTerm)
            )
        ));
    const matchesId =
      searchId === "" ||
      (artist.artistId && artist.artistId.toLowerCase().includes(searchId));

    return matchesCity && matchesSkill && matchesId;
  });

  return (
    <div className="artist">
      <h1>Artist Details</h1>

      {loading && <p>Loading artist data...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="filters">
            <div>
              <label htmlFor="cityFilter">City:</label>
              <select
                id="cityFilter"
                value={filterCity}
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                {[...new Set(artists.map((artist) => artist.city))].map(
                  (city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label>Search Skills:</label>
              <input
                type="text"
                placeholder="Enter skills"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div>
              <label>Artist ID:</label>
              <input
                type="text"
                placeholder="Enter Artist ID"
                value={searchId}
                onChange={handleSearchIdChange}
              />
            </div>
          </div>

          {filteredArtists.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Artist ID</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Skills</th>
                  <th>Pancard</th>
                </tr>
              </thead>
              <tbody>
                {filteredArtists.map((artist) => (
                  <tr key={artist._id}>
                    <td>{artist.email || "N/A"}</td>
                    <td>{artist.artistId || "N/A"}</td>
                    <td>{artist.name || "N/A"}</td>
                    <td>{artist.city || "N/A"}</td>
                    <td>
                      {artist.phoneNumber ? `+91 ${artist.phoneNumber}` : "N/A"}
                    </td>
                    <td>
                      {[
                        artist.houseNo,
                        artist.buildingHouseName,
                        artist.street,
                        artist.city,
                        artist.pincode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                    <td>
                      {Array.isArray(artist.skills)
                        ? artist.skills
                            .map((category) =>
                              category.skills ? category.skills.join(", ") : ""
                            )
                            .join(", ")
                        : "N/A"}
                    </td>
                    <td>{artist.pancard || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No artists match the current filters.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Artist;
