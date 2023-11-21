import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { Divider, Toolbar } from "@mui/material";
import Searchbox from "../Searchbox";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ReportColumnDefinitions } from "../../consts/reportData";
import { useReportsApi } from "../../api/reports/api";
import { BrowseReportsInput, Report } from "../../api/reports/types";
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import CustomNoRowsOverlay from "../EmptyGridCustom";

interface ResultBoxProps {
  reportQueryInput : BrowseReportsInput
}
const ResultBox = ({reportQueryInput} : ResultBoxProps) => {

  const {
    browseReports: { query: browseReports, data, isLoading },
  } = useReportsApi();



  useEffect(() => {
    browseReports(reportQueryInput)
    console.log(isLoading);
  }, [reportQueryInput])


  

  const columnDefs = ReportColumnDefinitions;
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
