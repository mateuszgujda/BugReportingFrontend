import { useParams } from "react-router";
import React, { useEffect } from "react";
import { Box, Card, CardContent, CircularProgress, Grid,} from "@mui/material";
import { useReportsApi } from "../api/reports/api";
import GeneralInfoBox from "../components/bugdetails/generalInfoBox";
import MachineSpecBox from "../components/bugdetails/machineSpecBox";
import ScreenshotBox from "../components/bugdetails/screenshotBox";
import FileBox from "../components/bugdetails/fileBox";


const BugDetails: React.FC = () => {

    let { id } = useParams();

    const {
        getReport: { query: getReport, data, isLoading },
    } = useReportsApi();

    useEffect(() => {
        getReport({ id: (id as string) })
    }, [id])

    return <Card sx={{ minWidth: 150 }}>
        <CardContent>

            {!isLoading ?
                <Box>
                    <Grid container spacing={2}   alignItems="stretch">
                        <Grid item xs={12} lg={6}>
                            <GeneralInfoBox reportType={data?.reportType || ""} reportState={data?.reportState || ""} addedAt={data?.addedAt || new Date()} version={data?.version || ""} frametime={data?.frameTime || -1} allowedContact={data?.allowContact || false} contactEmail={data?.contactEmail || ""} id={id || ""} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <MachineSpecBox platform={data?.machineSpecs?.platform || ""} cpu={data?.machineSpecs?.cpu || ""} gpu={data?.machineSpecs.gpu || ""} ram={data?.machineSpecs?.ram || ""} inputDevice={data?.machineSpecs?.inputDevice || ""} motherboard={data?.machineSpecs?.motherboard || ""} viewportDevice={data?.machineSpecs?.viewportDevice || ""} outputDevice={data?.machineSpecs?.outputDevice || ""} />
                        </Grid>
                        <Grid item xs={12} lg={6}> 
                            <ScreenshotBox screenshotId={data?.screenshotId} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FileBox subdirectoryId={data?.id || ""} />
                        </Grid>
                    </Grid>
                </Box> : <CircularProgress />}


        </CardContent>
    </Card>
}

export default BugDetails;