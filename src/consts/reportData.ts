import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridValueGetterParams } from "@mui/x-data-grid/models";
import * as Yup from 'yup';
import { ReportQueryFormState } from "../interfaces/forms";

interface Category {
  id: string;
  name: string;
}
export const Categories: Array<Category> = [
  {
    id: "General",
    name: "General",
  },
  {
    id: "Gameplay",
    name: "Gameplay",
  },
  {
    id: "Bug",
    name: "Bug",
  },
  {
    id: "Framerate",
    name: "Framerate",
  },
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
    flex: 1,
  },
  {
    field: "emotion",
    headerName: "Emotion",
    description: "Emotion of given feedback",
    flex: 1,
  },
  {
    field: "comment",
    headerName: "Comment",
    description: "Player comment",
    sortable: false,
    flex: 3,
  },
  {
    field: "screenshot",
    headerName: "Screenshot",
    description: "Screenshot provided with report",
    width: 200,
    flex: 2,
  },
  {
    field: "version",
    headerName: "Version",
    description: "Version of the game",
    flex: 1
  },
  {
    field: "frametime",
    headerName: "Frame Time[ms]",
    description: "Game FrameTime",
    flex: 1
  },
  {
    field: "Date",
    headerName: "Date",
    description: "Time at which the snapshot was taken",
    flex: 1
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
