"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import Box from "@mui/material/Box";
export default function Home() {
  const [facts, setFacts] = useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isShow, setIsShow] = useState(false);

  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleDeleteRow = (id) => {
    setFacts(facts.filter((fact) => fact.id !== id));
  };
  const handleDetailRow = (id) => {
    setIsShow(true);
    setSelectedRows(facts.find((fact) => fact.id === id));
  };

  const fetchData = () => {
    fetch(`https://catfact.ninja/facts?page=${page}&limit=30`)
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        data.data = data.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        console.log("data2", data), setFacts(data.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (params) => {
    if (params === page + 1) {
      setPage(params + 1);
    } else if (params === page - 1) {
      setPage(params - 1);
    }
  };

  const handlePageSizeChange = () => {
    setPage(1);
  };
  const columns = [
    { field: "fact", headerName: "fact", width: 300 },
    { field: "length", headerName: "length", width: 100 },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <button onClick={() => handleDeleteRow(params.row.id)}>Delete</button>
      ),
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 120,

      renderCell: (params) => (
        <button onClick={() => handleDetailRow(params.row.id)}>Detail</button>
      ),
    },
  ];
  console.log("array", facts);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridPro
        rows={facts}
        rowCount={50}
        columns={columns}
        pagination
        onPageSizeChange={handlePageSizeChange}
        onPageChange={(e) => {
          handlePageChange(e);
        }}
        pageSize={() => setRowsPerPage(rowsPerPage)}
        page={page}
        filterMode="server"
        checkboxSelection
        getRowId={(row) => row.id}
        {...facts}
      />
      {isShow ? (
        <Box sx={{ p: 2, border: "1px dashed grey" }}>
          fact : {JSON.stringify(selectedRows.fact, null, 4)}
          <br />
          length : {JSON.stringify(selectedRows?.length, null, 4)}
        </Box>
      ) : (
        ""
      )}
      {/* <Box sx={{ p: 2, border: "1px dashed grey" }}>
        fact : {JSON.stringify(selectedRows.fact, null, 4)}
        <br />
        length : {JSON.stringify(selectedRows?.length, null, 4)}
      </Box> */}
    </div>
  );
}
