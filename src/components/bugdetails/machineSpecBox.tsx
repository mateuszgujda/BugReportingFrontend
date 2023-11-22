import { Box, Divider, Grid, Icon, Typography } from "@mui/material";
import KeyboardIcon from '@mui/icons-material/Keyboard';


export interface MachineSpecProps {
    platform: string,
    cpu: string,
    gpu: string,
    ram: string,
    inputDevice: string,
    motherboard: string,
    viewportDevice: string,
    outputDevice: string
}
const MachineSpecBox = (props: MachineSpecProps) => {


    return (
        <Box>
            <Grid alignItems={"center"} container spacing={2} >
                <Grid xs={12} item >
                    <Box>
                        <Icon>
                            <KeyboardIcon />
                        </Icon>
                        <Typography variant="h5" component="span">
                            Specs
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: "2em" }} />
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        Platform: {props?.platform}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        CPU: {props?.cpu}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        GPU: {props?.gpu}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        RAM: {props?.ram}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        Input: {props?.inputDevice}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        MOBO: {props?.motherboard}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        View: {props?.viewportDevice}
                    </Typography>
                </Grid>
                <Grid xs={6} item={true}>
                    <Typography typography="H5" >
                        Output: {props?.outputDevice}
                    </Typography>
                </Grid>
            </Grid>
        </Box>)
}


export default MachineSpecBox;