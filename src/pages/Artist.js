import React, { useState } from 'react';
import './css/Artist.css';

const artistData = {
  _id: "6721e3f9e4b059dc53db02c8",
  email: "jayesh@test.com",
  name: "Jayesh",
  phoneNumber: "863826382628",
  houseNo: "806",
  buildingHouseName: "806",
  street: "ABC",
  city: "Mapusa",
  pincode: "403510",
  skills: ["Hair Styling", "Pedicure"],
  pancard: "DGdw2632",
  userId: "BCT4LUCKL2",
};

function Artist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('All');

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Handle city filter change
  const handleFilterChange = (event) => {
    setFilterCity(event.target.value);
  };

  // Function to check if any skill matches the search term (case insensitive)
  const matchesSearchTerm = (skill) => {
    return skill.toLowerCase().includes(searchTerm);
  };

  // Function to display artist data if city and search match
  const displayData = filterCity === 'All' || artistData.city === filterCity ? artistData : null;

  // Filter skills based on the search term (for display outside table)
  const filteredSkills = artistData.skills.filter(matchesSearchTerm);
  const noSkillsFound = filteredSkills.length === 0 && searchTerm !== ''; // If no skills found and search term is not empty

  return (
    <div className="artist">
      <h1>Artist Details</h1>
  
      {/* City Filter Dropdown */}
      <div className="filter">
        <label htmlFor="cityFilter">Filter by City:</label>
        <select id="cityFilter" value={filterCity} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Mumbai">Mumbai</option>
          {/* Add other cities here if needed */}
        </select>
      </div>
  
      {/* Search Input for skills */}
      <div className="search">
        <label htmlFor="search">Search Skills:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search skills"
        />
      </div>
  
      {/* Conditional Rendering */}
      {displayData && filteredSkills.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Skills</th>
              <th>Pancard</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{artistData.email}</td>
              <td>{artistData.name}</td>
              <td>{artistData.phoneNumber}</td>
              <td>
                {artistData.houseNo}, {artistData.buildingHouseName},{" "}
                {artistData.street}, {artistData.city}, {artistData.pincode}
              </td>
              <td>{artistData.skills.join(", ")}</td>
              <td>{artistData.pancard}</td>
            </tr>
          </tbody>
        </table>
      ) : noSkillsFound ? (
        <div className="no-skills-found">
          <p>No skills match the search term.</p>
        </div>
      ) : (
        <p>No artist found for the selected city.</p>
      )}
    </div>
  );
  
}

export default Artist;
