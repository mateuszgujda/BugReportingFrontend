import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

interface SearchboxProps {
  placeholder?: string;
  onSearchClick?: (searchText: string) => void;
  onKeyUp?: (currentSearchText: string) => void;
}

const Searchbox = (props: SearchboxProps) => {
  const [searchText, setSearchText] = useState("");

  const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setSearchText(event.currentTarget.value);
    if (props.onKeyUp) {
      props.onKeyUp(event.currentTarget.value);
    }
  };

  const searchClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (props.onSearchClick) {
      props.onSearchClick(searchText);
    }
  };

  return (
    <Box display={"flex"}>
    <FormControl fullWidth sx={{m: 1}}  variant="filled">
     <InputLabel htmlFor="search-box-filled">Search</InputLabel>
      <FilledInput
        id="search-box-filled"
        type="text"
        aria-label="Search"
        placeholder={props.placeholder}
        endAdornment={
            
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={searchClickHandler}
              onMouseDown={searchClickHandler}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
    </Box>
  );
};
export default Searchbox;
