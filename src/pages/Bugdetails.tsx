import { useParams } from "react-router";
import React, { useEffect } from "react";
import { Box, Card, CardContent, CircularProgress, Divider, Grid, Icon, Toolbar, Typography } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useReportsApi } from "../api/reports/api";
import moment from "moment";
import FolderIcon from '@mui/icons-material/Folder';


const BugDetails: React.FC = () => {

    let { id } = useParams();

    const {
        getReport: { query: getReport, data, isLoading },
    } = useReportsApi();

    useEffect(() => {
        getReport({ id: (id as string) })
        console.log(isLoading);
    }, [id])

    return <Card sx={{ minWidth: 150 }}>
        <CardContent>
            <Box>
                <Icon>
                    <BugReportIcon />
                </Icon>
                <Typography variant="h5" component="span">
                    Report  #{id}
                </Typography>
            </Box>
            <Divider sx={{ marginBottom: "2em" }} />
            {!isLoading ? <Box>
                <Grid alignItems={"center"} container spacing={2} sx={{ marginBottom: "2em" }}>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            Type: {data?.reportType}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            State: {data?.reportState}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            Added: {moment(data?.addedAt).format("D.MM.YYYY HH:mm:ss")}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            Version: {data?.version}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            Frametime: {data?.frameTime}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            Mail: {data?.contactEmail}
                        </Typography>
                    </Grid>
                </Grid>
                <Box>
                    <Icon>
                        <KeyboardIcon />
                    </Icon>
                    <Typography variant="h5" component="span">
                        Specs
                    </Typography>
                </Box>
                <Divider sx={{ marginBottom: "2em" }} />
                <Grid alignItems={"center"} container spacing={2} sx={{ marginBottom: "2em" }} >
                    <Grid xs={12} item={true}>
                        <Typography typography="H5" >
                            Platform: {data?.machineSpecs?.platform}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            CPU: {data?.machineSpecs?.cpu}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            GPU: {data?.machineSpecs?.gpu}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            RAM: {data?.machineSpecs?.ram}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            Input: {data?.machineSpecs?.inputDevice}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            MOBO: {data?.machineSpecs?.motherboard}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            View: {data?.machineSpecs?.viewportDevice}
                        </Typography>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <Typography typography="H5" >
                            Output: {data?.machineSpecs?.outputDevice}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ marginBottom: "2em" }} />
            </Box> : <CircularProgress />}


        </CardContent>
    </Card>
}

export default BugDetails;