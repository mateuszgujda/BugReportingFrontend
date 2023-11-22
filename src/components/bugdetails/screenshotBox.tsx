
import ImageIcon from '@mui/icons-material/Image';
import { CircularProgress, Divider, Grid, Icon, IconButton, ImageList, ImageListItem, ImageListItemBar, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFilesApi } from '../../api/files/api';
import { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';

export interface ScreenshotBoxProps {
    screenshotId?: string
}

const ScreenshotBox = (props: ScreenshotBoxProps) => {

    const {
        getFile: { query: getFile, data: fileData, isLoading: fileIsLoading },
        getFileInfo: { query: getFileInfo, data: fileInfoData, isLoading: fileInfoIsLoading }
    } = useFilesApi();

    const [screnshotFile, setScreenshotFile] = useState<string | ArrayBuffer | null>(null);
    const [isDownloadingFile, setIsDownloadingFile] = useState(false);
    useEffect(() => {
        if (props.screenshotId) {
            getFileInfo({ id: props.screenshotId });
            getFile({ id: props.screenshotId });
        }

    }, [props.screenshotId]);

    function humanFileSize(size : number) {
        var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }



    useEffect(() => {
        if (fileData) {
            blobToBase64(fileData).then(res => {setScreenshotFile(res)});
        }
    }, [fileData]);

    function blobToBase64(blob: Blob) {
        return new Promise<string | ArrayBuffer | null>((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    const downloadScreenshot = () => {
        if(fileData && fileInfoData)
        {
            setIsDownloadingFile(true);
            const url = window.URL.createObjectURL(
                new Blob([fileData]),
              );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
            'download',
            `${fileInfoData.fileName}`,
            );
            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode?.removeChild(link);
            setIsDownloadingFile(false);
        }
    }

    const DisplayScreenshotData = () => {

        if (props.screenshotId) {
            return (
                <ImageList>
                    <ImageListItem>
                        {(fileIsLoading && !screnshotFile) ? (<Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />) : (
                            <img
                                //srcSet={`${screnshotFile}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${screnshotFile}`}
                                alt={"screenshot"}
                                loading="lazy"
                            />
                        )
                        }
                        {
                            (fileInfoIsLoading) ? (<Skeleton
                                animation="wave"
                                height={2}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />)
                                : (<ImageListItemBar
                                    title={fileInfoData?.fileName}
                                    subtitle={humanFileSize(fileInfoData?.size || 0)}
                                    actionIcon={
                                        !isDownloadingFile? (<IconButton
                                            onClick={() => {downloadScreenshot()}}
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)', marginRight: "0.5em" }}
                                            aria-label={`download file ${fileInfoData?.fileName}`}
                                        >
                                            <DownloadIcon />
                                        </IconButton>)
                                        : (
                                            <CircularProgress />
                                        )
                                    }
                                />
                                )
                        }
                    </ImageListItem>

                </ImageList>

            )
        }
        else {
            return <Typography variant="h5" component="span">
                No Screenshot data
            </Typography>
        }
    };

    return (<Box>
        <Grid alignItems={"center"} container spacing={2} sx={{ marginBottom: "1em" }} >
            <Grid xs={12} item >
                <Box>
                    <Icon>
                        <ImageIcon />
                    </Icon>
                    <Typography variant="h5" component="span">
                        Screenshot
                    </Typography>
                </Box>
                <Divider sx={{ marginBottom: "1em" }} />
            </Grid>
            <Grid xs={12} item>
                {DisplayScreenshotData()}
            </Grid>
        </Grid>
    </Box>)
}

export default ScreenshotBox;