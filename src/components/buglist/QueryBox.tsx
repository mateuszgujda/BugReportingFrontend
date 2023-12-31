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
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import React from "react";
import { Emotions, Categories, ReportValidationSchema, IssueTypes } from "../../consts/reportData";
import { ReportQueryFormState } from "../../interfaces/forms";
import { Controller, useForm } from 'react-hook-form';
import FormInputText, { FormInputDropdown, FormSelectInputOption } from "../../controls/input/formInput";
import { yupResolver } from '@hookform/resolvers/yup';

import moment from "moment";

interface QueryBoxProps {
  formChangeHandler: (newState : ReportQueryFormState) => void; 
}

const QueryBox = ({formChangeHandler} : QueryBoxProps) => {

  var todaDate = moment().add(1, 'days').hours(0).minutes(0).milliseconds(0).seconds(0).format('yyyy-MM-D');
  
  var oneMonthAgo = moment().subtract(1, 'months').format('yyyy-MM-D');

  const defaultValues: ReportQueryFormState = {
    startDate: oneMonthAgo,
    endDate: todaDate,
    category: "All",
    issueType: "All",
    emotion: "All",
    screenshot: "All",
    frametime: undefined,
    version: "",
    limit: 20,
  };

  const { handleSubmit, reset, control, setValue } = useForm<ReportQueryFormState>({
    defaultValues: defaultValues,
  });

  const onSubmit = React.useCallback((values: ReportQueryFormState) => {
    formChangeHandler(values);
  }, []);

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
          <form onSubmit={handleSubmit(onSubmit)}>

            <Grid alignItems={"center"} container spacing={2}>
              <Grid xs={6} item={true}>
                <FormInputText name="startDate" control={control} type="Date" label="Date From" />
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <FormInputText name={"endDate"} label={"Date to"} type="Date" control={control}></FormInputText>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <FormInputDropdown defaultValue="All" name="category" label="Categories" control={control} options={[...Categories.map(x => {return {name: x.name, value: x.id}}), {name: "All", value: "All"}]}/>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <FormInputDropdown defaultValue="All" name="emotion" label="Emotion" control={control} options={[... Emotions.map(x => {return { name: x.name, value: x.id}} ), {name: "All", value: "All"}]}/>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <FormInputDropdown defaultValue="All" name="screenshot" label="Screenshot" control={control} options={[{name: "Yes", value: "true"}, {name: "No", value: "false"}, {name: "All", value: "All"}]}/>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <FormInputDropdown defaultValue="All" name="issueType" label="Issue Category" control={control} options={[... IssueTypes.map(x => {return { name: x.name, value: x.id}} ), {name: "All", value: "All"}]}/>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <FormInputText name={"version"} label={"Version"} control={control}></FormInputText>
                </FormControl>
              </Grid>
              <Grid xs={6} item={true}>
                <FormControl fullWidth>
                  <FormInputText name={"limit"} type="number" label={"Limit"} control={control}></FormInputText>
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
