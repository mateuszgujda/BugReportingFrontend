import { Box, Divider, Grid, Icon, Typography } from "@mui/material";
import KeyboardIcon from '@mui/icons-material/Keyboard';
;


export interface GPUMetrics {
    deviceDescription?: string;
    providerName?: string;
    internalDriverVersion?: string;
    userDriverVersion?: string;
    driverDate?: string;
    RHIName?: string;
    brand?: string;
}

export interface DiskMetrics{
    availableSize: number;
    totalSize: number;
}

export interface CPUMetrics {
    brand?: string;
    chipset?: string;
    vendor?: string;
    cores?: number;
    coresWithHyperthread?: number;
    usePercentage?: number;
}

export interface ScreenResolution {
    height?: number;
    width?: number;
}

export interface MemoryMetrics {
    totalMemoryGB?: number;
    physicalMemoryAvailableBytes?: number;
    virtualMemoryAvailableBytes?: number;
    physicalMemoryUsedBytes?: number;
    virtualMemoryUsedBytes?: number;
}

export interface MachineSpecProps {
    platform?: string;
    cpu?: CPUMetrics;
    gpu?: GPUMetrics;
    ram?: MemoryMetrics;
    disk? :DiskMetrics;
    outputDevice?: string;
    screenResolution?: ScreenResolution;
    inputType?: string;
    language: string;
    locale: string;
}
const MachineSpecBox = (props: MachineSpecProps) => {

    function humanFileSize(size: number) {
        var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }


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
                <Grid xs={12} lg={6} item>
                    <Box>
                        <Typography variant="h5" component="span">
                            General
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: "2em" }} />
                    <Grid container>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Platform: {props?.platform}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                OutputDevice: {props?.outputDevice}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                InputType: {props?.inputType}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Resolution: {props?.screenResolution?.width} x {props?.screenResolution?.height}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Language: {props?.language} 
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Locale: {props?.locale}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} lg={6} item>
                    <Box>
                        <Typography variant="h5" component="span">
                            CPU
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: "2em" }} />
                    <Grid container>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Brand: {props?.cpu?.brand}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Chipset: {props?.cpu?.chipset}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Cores: {props?.cpu?.cores}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                HyperthreadCores: {props?.cpu?.coresWithHyperthread}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                UsePercentage: {props?.cpu?.usePercentage}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Vendor: {props?.cpu?.vendor}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} lg={6} item>
                    <Box>
                        <Typography variant="h5" component="span">
                            GPU
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: "2em" }} />
                    <Grid container>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Brand: {props?.gpu?.brand}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                RHIName: {props?.gpu?.RHIName}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Description: {props?.gpu?.deviceDescription}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                DriverDate: {props?.gpu?.driverDate}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Internal Driver Version: {props?.gpu?.internalDriverVersion}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                Provider Name: {props?.gpu?.providerName}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                User Driver Version: {props?.gpu?.userDriverVersion}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} lg={6} item>
                    <Box>
                        <Typography variant="h5" component="span">
                            Memory
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: "2em" }} />
                    <Grid container>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                TotalMemory: {props?.ram?.totalMemoryGB} GB
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                PhysicalMemory(Used/Available): {humanFileSize(props?.ram?.physicalMemoryUsedBytes || 0)} / {humanFileSize(props?.ram?.physicalMemoryAvailableBytes || 0)}
                            </Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                VirtualMemory(Used/Available):  {humanFileSize(props?.ram?.virtualMemoryUsedBytes || 0)} / {humanFileSize(props?.ram?.virtualMemoryAvailableBytes || 0)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} lg={6} item>
                    <Box>
                        <Typography variant="h5" component="span">
                            Disk
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: "2em" }} />
                    <Grid container>
                        <Grid xs={12} item>
                            <Typography typography="H5" >
                                DiskSpace(Total/Available): {humanFileSize(props?.disk?.totalSize || 0)} / {humanFileSize(props?.disk?.availableSize || 0)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >)
}


export default MachineSpecBox;