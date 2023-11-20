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

const ResultBox = () => {
  const columnDefs = ReportColumnDefinitions;
  const rows: Array<any> = [];
  return (
    <Card sx={{ minWidth: 275 }}>
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
