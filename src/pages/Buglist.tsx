import { PagedResult } from "../api/shared/types";
import { BrowseReportsInput, Report } from "../api/reports/types";
import { Stack } from "@mui/material";
import QueryBox from "../components/buglist/QueryBox";
import ResultBox from "../components/buglist/ResultBox";
import { useEffect, useState } from "react";
import { ReportQueryFormState } from "../interfaces/forms";
import { useReportsApi } from "../api/reports/api";

import moment from "moment";


const Buglist : React.FC = () => {


  const [browseReportsInputData, setBrowseReportsInputData] = useState<BrowseReportsInput>({
    page: 0,
    results: 0,
    orderBy: "",
    sortOrder: "desc",
    fromDate : moment().subtract(1, 'months').format('yyyy-MM-D'),
    toDate : moment().format("yyyy-MM-D"),
    frametime : undefined,
    version : '',
    emotion : undefined,
    type : undefined,
    hasScreenshot : undefined
  });
  
  const formChangeHandler = async (newFormState : ReportQueryFormState) => {
      //console.log(newFormState);

      const browseNewInput : BrowseReportsInput = {
        page: 0,
        results: 0,
        orderBy: "",
        sortOrder: "desc",
        fromDate : newFormState.startDate,
        toDate : newFormState.endDate,
        frametime : newFormState.frametime,
        version : newFormState.version,
        emotion : newFormState.emotion == "All" ? undefined : newFormState.emotion,
        type : newFormState.category == "All"? undefined : newFormState.category,
        hasScreenshot : newFormState.screenshot == "All" ? undefined : Boolean(newFormState.screenshot)
      }

      //console.log(browseNewInput);
      setBrowseReportsInputData(browseNewInput);

  };
  return (
    <Stack spacing={2}>
      <QueryBox formChangeHandler={formChangeHandler} />
      <ResultBox reportQueryInput={browseReportsInputData} />
    </Stack>
  );
};

export default Buglist;
