import { Box, Divider, Grid, Icon, Typography } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import moment from "moment";

export interface GeneralInfoBoxProps {
    reportType: string,
    reportState: string,
    addedAt: Date,
    version: string,
    frametime: number,
    allowedContact: boolean,
    contactEmail: string,
    id: string

}

const GeneralInfoBox = (props: GeneralInfoBoxProps) => {


    const ShowContactInfo = (isContactAllowed: boolean) => {

        if (isContactAllowed) {
            return <Typography typography="H5" >
                {props?.contactEmail}
            </Typography>
        }
        else {
            return <Typography typography="H5" >
                Contact Not Allowed
            </Typography>
        }
    }


    return (
        <Box>
            <Grid alignItems={"center"} container spacing={2} sx={{ marginBottom: "1em" }}>
                <Grid xs={12} item >
                    <Box>
                        <Icon>
                            <BugReportIcon />
                        </Icon>
                        <Typography variant="h5" component="span">
                            Report  #{props?.id}
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: "1em" }} />
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        Type: {props?.reportType}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        State: {props?.reportState}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        Added: {moment(props?.addedAt).format("D.MM.YYYY HH:mm:ss")}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        Version: {props?.version}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        Frametime: {props?.frametime}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    {ShowContactInfo(props?.allowedContact)}

                </Grid>
            </Grid>

        </Box>)
}


export default GeneralInfoBox;