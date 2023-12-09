import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({
  rows,
  columns,
  selectModel,
  setSelectionModel,
}) {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        checkboxSelection
        rowSelectionModel={selectModel}
        onRowSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection);
        }}
      />
    </div>
  );
}
