import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { Divider } from "@mui/material";
import Searchbox from "../Searchbox";
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridPaginationModel, GridRowId } from "@mui/x-data-grid";
import { ReportColumnDefinitions } from "../../consts/reportData";
import { useReportsApi } from "../../api/reports/api";
import { BrowseReportsInput, Report } from "../../api/reports/types";
import { MouseEventHandler, useEffect } from "react";
import CustomNoRowsOverlay from "../EmptyGridCustom";
import React from "react";
import { useNavigate } from "react-router";

interface ResultBoxProps {
  reportQueryInput: BrowseReportsInput
  onPageChanged: (newPage: number) => void
}
const ResultBox = ({ reportQueryInput, onPageChanged }: ResultBoxProps) => {

  const {
    browseReports: { query: browseReports, data, isLoading },
  } = useReportsApi();

  const IsAuthenticated = true;


  const PaginationModelChanged = (model: GridPaginationModel, details : GridCallbackDetails<any>) => {
    console.log(model.page+1);
    onPageChanged(model.page);
  }


  useEffect(() => {
    console.log("Changed");
    browseReports(reportQueryInput)
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
  console.log(rows);
  const currentPageSize: number = data? data.resultsPerPage : 20;
  const currentPage: number = data? data.currentPage -1 : 0;
  const totalPages: number = data? data.totalPages : 0;
  const totalResults: number = data? data.totalResults : 0;
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
          paginationMode="server"
          paginationModel={{
            page: currentPage,
            pageSize: currentPageSize
          }}
          pageSizeOptions={[currentPageSize]}
          rowCount={totalResults}
          onPaginationModelChange={PaginationModelChanged}
        />
      </CardContent>
    </Card>
  );
};

export default ResultBox;
