import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { Divider } from "@mui/material";
import Searchbox from "../Searchbox";
import { DataGrid, GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { ReportColumnDefinitions } from "../../consts/reportData";
import { useReportsApi } from "../../api/reports/api";
import { BrowseReportsInput, Report } from "../../api/reports/types";
import { MouseEventHandler, useEffect } from "react";
import CustomNoRowsOverlay from "../EmptyGridCustom";
import React from "react";
import { useNavigate } from "react-router";

interface ResultBoxProps {
  reportQueryInput: BrowseReportsInput
}
const ResultBox = ({ reportQueryInput }: ResultBoxProps) => {

  const {
    browseReports: { query: browseReports, data, isLoading },
  } = useReportsApi();

  const IsAuthenticated = true;




  useEffect(() => {
    browseReports(reportQueryInput)
    console.log(isLoading);
  }, [reportQueryInput])


  const navigate = useNavigate();


  let columnDefs = ReportColumnDefinitions;
  if (IsAuthenticated) {
    columnDefs = [...columnDefs, {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      sortable: false,
      hideable: true,
      filterable: false,
      flex: 1,
      getActions: ({ id, columns, row }) => {

        const handleDetailsClick = (id: GridRowId): MouseEventHandler<HTMLButtonElement> => ()  => {
          console.log(row.id);
          navigate("reports/" + row.id);
        }

        return [
          <GridActionsCellItem label="Details" icon={React.createElement(FindInPageIcon)} onClick={handleDetailsClick(id)}  >

          </GridActionsCellItem>
        ]
      }
    }]
  }
  const rows: Array<Report> = data ? data.items : [];
  return (
    <Card sx={{ minWidth: 275 }} >
      <CardContent>
        <Box>
          <Icon>
            <FindInPageIcon />
          </Icon>
          <Typography variant="h5" component="span">
            Results
          </Typography>
        </Box>
        <Divider />
        <Searchbox />
        <DataGrid
          sx={{ '--DataGrid-overlayHeight': '300px' }}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          autoHeight
          getRowHeight={() => 'auto'}
          loading={isLoading}
          rows={rows}
          columns={columnDefs}
          initialState={{
            pagination: {
              paginationModel: { page: 0 },
            },
          }}
          pageSizeOptions={[]}
        />
      </CardContent>
    </Card>
  );
};

export default ResultBox;
