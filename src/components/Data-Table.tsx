import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState,useEffect } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "First name", width: 130 },
  { field: "username", headerName: "User name", width: 130 },
  { field: "email", headerName: "Email Id", width: 130 },
  { field: "dob", headerName: "Date Of Birth", width: 130 },
  { field: "no_of_companies", headerName: "Number Of Companies", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "created_at", headerName: "Created At", width: 130 },
  { field: "updated_at", headerName: "Updated At", width: 130 },
];

export default function DataTable() {
  const [data, setData] = useState([
    {
      id: 0,
      name: "",
      username: "",
      email: "",
      dob: "",
      no_of_companies: "",
      status: "",
      created_at: "",
      updated_at: "",
    },
  ]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3434/usersTable", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await response.json();
        console.log(jsonData)
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
// console.log(data)
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
