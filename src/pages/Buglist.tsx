import { Stack } from "@mui/material";
import QueryBox from "../components/buglist/QueryBox";
import ResultBox from "../components/buglist/ResultBox";

const Buglist = () => {
  return (
    <Stack spacing={2}>
      <QueryBox />
      <ResultBox />
    </Stack>
  );
};

export default Buglist;
