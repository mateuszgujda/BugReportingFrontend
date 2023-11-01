import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import React, { FormEventHandler } from "react";
import { Emotions, Categories } from "../../consts/reportData";

const QueryBox = () => {
  const [category, setCategory] = React.useState("");
  const [emotion, setEmotion] = React.useState("");
  const [screenshot, setScreenshot] = React.useState("");
  const [frametime, setFrametime] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [limit, setLimit] = React.useState("");
  const [version, setVersion] = React.useState("");

  const EmotionBase = Emotions;
  const CategoriesBase = Categories;

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleEmotionChange = (event: SelectChangeEvent) => {
    setEmotion(event.target.value as string);
  };

  const handleScreenshotChange = (event: SelectChangeEvent) => {
    setScreenshot(event.target.value as string);
  };

  const handleFrametimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFrametime(event.target.value as string);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value as string);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value as string);
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(event.target.value as string);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(event.target.value as string);
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box>
          <Icon>
            <HelpIcon />
          </Icon>
          <Typography variant="h5" component="span">
            Query
          </Typography>
        </Box>
        <Divider />
        <Toolbar />
        <Box>
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <TextField
                    id="query-start-date"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    label="Start Date"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <TextField
                    id="query-end-date"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    label="End Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <InputLabel id="query-category">Category</InputLabel>
                  <Select
                    labelId="query-category"
                    id="query-category-select"
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    {CategoriesBase.map((category) => {
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                    <MenuItem value="all">All</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <InputLabel id="query-emotion">Emotion</InputLabel>
                  <Select
                    labelId="query-emotion"
                    id="query-emotion-select"
                    value={emotion}
                    label="Emotion"
                    onChange={handleEmotionChange}
                  >
                    {EmotionBase.map((emotion) => {
                      return (
                        <MenuItem key={emotion.id} value={emotion.rate}>
                          {emotion.name}
                        </MenuItem>
                      );
                    })}
                    <MenuItem value="all">All</MenuItem>;
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <InputLabel id="query-screenshot">Screenshot</InputLabel>
                  <Select
                    labelId="query-screenshot"
                    id="query-screenshot-select"
                    value={screenshot}
                    label="Screenshot"
                    onChange={handleScreenshotChange}
                  >
                    <MenuItem value="all">Yes</MenuItem>;
                    <MenuItem value="all">No</MenuItem>;
                    <MenuItem value="all">All</MenuItem>;
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <TextField
                    id="query-frame-rate"
                    type="number"
                    label="Frametime"
                    value={frametime}
                    onChange={handleFrametimeChange}
                  />
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <TextField
                    id="query-version"
                    type="text"
                    label="Version"
                    value={version}
                    onChange={handleVersionChange}
                  />
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <TextField
                    id="query-frame-rate"
                    type="number"
                    label="Limit"
                    value={limit}
                    onChange={handleLimitChange}
                  />
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <Box display={"flex"} flexDirection={"row-reverse"}>
                <Button type="submit" variant="contained">Submit</Button>
                </Box>
              </Grid>
              <Grid xs={6} item={true} >
                <Button type="submit" variant="contained" color="secondary">Download results</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QueryBox;
