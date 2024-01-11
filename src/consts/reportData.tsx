import { SvgIconTypeMap, styled } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import * as Yup from 'yup';
import React from "react";
import moment from "moment";

interface Category {
  id: string;
  name: string;
}

interface IssueType { 
  id: string;
  name: string;
}
export const Categories: Array<Category> = [
  {
    id: "Issue",
    name: "Issue"
  },
  {
    id: "Idea",
    name: "Idea",
  },
  {
    id: "Questions",
    name: "Questions",
  },
  {
    id: "Feedback",
    name: "Feedback",
  },
  {
    id: "Other",
    name: "Other",
  }
];

export const IssueTypes: Array<IssueType> = [
  {
    id: "None",
    name: "None",
  },
  {
    id: "Crash or Freeze",
    name: "Crash_Freeze",
  },
  {
    id: "Performance",
    name: "Performance",
  },
  {
    id: "GameplayDefects",
    name: "GameplayDefects",
  },
  {
    id: "Audio",
    name: "Audio",
  },
  {
    id: "Visual",
    name: "Visual",
  },
  {
    id: "Other",
    name: "Other"
  }
];

interface Emotion {
  id: string;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  rate: number;
}

export const Emotions: Array<Emotion> = [
  {
    id: "VERY_SATISFIED",
    name: "Very Satisfied",
    icon: SentimentVerySatisfiedIcon,
    rate: 5,
  },
  {
    id: "SATISFIED",
    name: "Satisfied",
    icon: SentimentSatisfiedAltIcon,
    rate: 4,
  },
  {
    id: "NEUTRAL",
    name: "Neutral",
    icon: SentimentNeutralIcon,
    rate: 3,
  },
  {
    id: "DISSATISFIED",
    name: "Dissatisfied",
    icon: SentimentDissatisfiedIcon,
    rate: 2,
  },
  {
    id: "VERY_DISSATISFIED",
    name: "Very Dissatisfied",
    icon: SentimentVeryDissatisfiedIcon,
    rate: 1,
  }
];

export const ReportColumnDefinitions: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    description: "Report Identifier",
    sortable: false,
    hideable: true,
    filterable: false,
    flex: 1,
  },
  {
    field: "emotion",
    headerName: "Emotion",
    description: "Emotion of given feedback",
    flex: 1,
    hideable: true,
    filterable: false,
    renderCell: (params => {
      return React.createElement(Emotions.find(x => x.id == params.row.emotion)?.icon as OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string });
    })
  },
  {
    field: "comment",
    headerName: "Comment",
    description: "Player comment",
    sortable: false,
    filterable: false,
    flex: 2,
  },
  {
    field: "hasScreenshot",
    headerName: "Screenshot",
    description: "Wheter or not screenshot is included",
    flex: 1,
    hideable: true,
    filterable: false,
    renderCell: (params => {
      return React.createElement(Boolean(params.row.hasScreenshot) ? CheckIcon : CloseIcon);
    })
  },
  {
    field: "version",
    headerName: "Version",
    description: "Version of the game",
    flex: 1,
    hideable: true,
    filterable: false
  },
  {
    field: "reportCategory",
    headerName: "Issue Category",
    description: "Issue Category",
    flex: 1,
    hideable: true,
    filterable: false
  },
  {
    field: "addedAt",
    headerName: "Date",
    description: "Time at which the snapshot was taken",
    flex: 1,
    hideable: true,
    filterable: false,
    valueGetter: (params => {
      return moment(params.row.addedAt).format("D.MM.YYYY HH:mm:ss");
    })
  },
  {
    field: "reportType",
    headerName: "Category",
    description: "Report category",
    flex: 1,
    hideable: true,
    filterable: false
  }
];


export const ReportValidationSchema = Yup.object().shape({
  startDate: Yup.string().required(),
  endDate: Yup.string().required(),
  category: Yup.string().required("Category option is required"),
  emotion: Yup.string().required("Emotion option is required"),
  screenshot: Yup.string().required("Screenshot option is required"),
  frametime: Yup.number().notRequired().min(0, "Frametime cannot be lower than 0"),
  version: Yup.string().required(),
  limit : Yup.number().required("limit is required!")
    .min(10, "Limit cannot be lower than 10")
    .max(100, "Limit cannot be higher than 100"),
})

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
