import { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function Data() {
  const [teamData, setTeamData] = useState([]);

  // Fetch team data
  useEffect(() => {
    const fetchedData = [
      {
        email: "jayesh@test.com",
        name: "jayesh",
        phoneNumber: "863826382628",
        houseNo: "806",
        buildingHouseName: "806",
        street: "ABC",
        pincode: "403510",
        skills: ["JavaScript", "React", "Node.js","JavaScript", "React", "Node.js"],
        pancard: "DGdw2632",
        userId: "BCT4LUCKL2",
      },
      {
        email: "alexa@test.com",
        name: "alexa",
        phoneNumber: "9876543210",
        houseNo: "205",
        buildingHouseName: "Pine Residency",
        street: "Main Street",
        pincode: "500081",
        skills: ["Python", "Django", "Flask", "Machine Learning"],
        pancard: "ABCD1234",
        userId: "XYZ4LUCKL2",
      },
      // Add more rows as needed
    ];
    setTeamData(fetchedData);
  }, []);

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRowExpansion = (userId) => {
    setExpandedRows((prevState) => {
      if (prevState.includes(userId)) {
        return prevState.filter((id) => id !== userId); // Collapse
      } else {
        return [...prevState, userId]; // Expand
      }
    });
  };

  const Skills = ({ skills, userId }) => {
    const MAX_SKILLS = 2; // Show 2 skills initially
    const skillsToShow = expandedRows.includes(userId) ? skills : skills.slice(0, MAX_SKILLS);

    return (
      <MDBox>
        <MDTypography variant="caption">{skillsToShow.join(", ")}</MDTypography>
        {skills.length > MAX_SKILLS && (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              toggleRowExpansion(userId);
            }}
          >
            {expandedRows.includes(userId) ? " Show less" : " Show more"}
          </MDTypography>
        )}
      </MDBox>
    );
  };

  const rows = teamData.map((data) => ({
    email: (
      <MDTypography variant="caption" color="text">
        {data.email}
      </MDTypography>
    ),
    name: (
      <MDTypography variant="caption" color="text">
        {data.name}
      </MDTypography>
    ),
    phoneNumber: (
      <MDTypography variant="caption" color="text">
        {data.phoneNumber}
      </MDTypography>
    ),
    houseNo: (
      <MDTypography variant="caption" color="text">
        {data.houseNo}
      </MDTypography>
    ),
    buildingHouseName: (
      <MDTypography variant="caption" color="text">
        {data.buildingHouseName}
      </MDTypography>
    ),
    street: (
      <MDTypography variant="caption" color="text">
        {data.street}
      </MDTypography>
    ),
    pincode: (
      <MDTypography variant="caption" color="text">
        {data.pincode}
      </MDTypography>
    ),
    skills: <Skills skills={data.skills} userId={data.userId} />,
    pancard: (
      <MDTypography variant="caption" color="text">
        {data.pancard}
      </MDTypography>
    ),
    userId: (
      <MDTypography variant="caption" color="text">
        {data.userId}
      </MDTypography>
    ),
  }));

  return {
    columns: [
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Phone Number", accessor: "phoneNumber", align: "left" },
      { Header: "House No", accessor: "houseNo", align: "left" },
      { Header: "Building/House Name", accessor: "buildingHouseName", align: "left" },
      { Header: "Street", accessor: "street", align: "left" },
      { Header: "Pincode", accessor: "pincode", align: "left" },
      { Header: "Skills", accessor: "skills", align: "left" },
      { Header: "PAN Card", accessor: "pancard", align: "left" },
      { Header: "User ID", accessor: "userId", align: "left" },
    ],
    rows: rows,
  };
}
