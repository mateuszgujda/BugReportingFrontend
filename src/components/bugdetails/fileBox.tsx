import { Box, CircularProgress, Divider, Grid, Icon, List, ListItem, ListItemText, Skeleton, Typography } from "@mui/material";
import FolderZipIcon from '@mui/icons-material/FolderZip';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { useFilesApi } from "../../api/files/api";
import { useEffect, useState } from "react";

export interface FileboxProps {
    subdirectoryId: string;
}

const FileBox = (props: FileboxProps) => {

    function humanFileSize(size: number) {
        var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }

    const [isFileDownloading, setIsFileDownloading] = useState(false);

    const {
        queryFileInfoSubdirectory: { query: getSubdirectoryFileInfo, data: subdirectoryFileInfoData, isLoading: subdirectoryInfoDataIsLoading },
        queryFilesSubdirectory: { query: downloadSubdirectory, data: subdirectoryFilesData, isLoading: subdirectoryFileIsLoading },
        getFile: { query: getFile, data: fileData, isLoading: fileIsDownloading }
    } = useFilesApi();

    useEffect(() => {
        if (props.subdirectoryId) {
            getSubdirectoryFileInfo({ subdirectoryId: props.subdirectoryId, fileType: "save" });
        }
    }, [props.subdirectoryId])

    const downloadDirectory = async (id: string) => {
        setIsFileDownloading(true);
        if (props.subdirectoryId) {
            await downloadSubdirectory({ subdirectoryId: id, fileType: "save" })
            if (subdirectoryFilesData) {
                const url = window.URL.createObjectURL(
                    new Blob([subdirectoryFilesData]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${id}.zip`,
                );
                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode?.removeChild(link);

            }
            setIsFileDownloading(false);
        }
    }




    const downloadFile = async (id: string, name: string) => {
        setIsFileDownloading(true);
        await getFile({ id });

        if (fileData) {
            const url = window.URL.createObjectURL(
                new Blob([fileData]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `${name}`,
            );
            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode?.removeChild(link);

        }
        setIsFileDownloading(false);

    };


    return (
        <Grid alignItems={"center"} container spacing={2} sx={{ marginBottom: "1em" }} >
            <Grid xs={12} item >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                    <Box sx={{ display: "flex" }}>
                        <Icon >
                            <FolderZipIcon />
                        </Icon>
                        <Typography variant="h5" component="span" justifyContent={"center"}>
                            Saves
                        </Typography>
                    </Box>
                    {
                        (!isFileDownloading) ? (<IconButton onClick={() => downloadDirectory(props.subdirectoryId)} edge="end" aria-label="download">
                            <DownloadIcon />
                        </IconButton>) : (<CircularProgress />)
                    }
                </Box>

                <Divider sx={{ marginBottom: "1em" }} />
            </Grid>
            <Grid xs={12} item>
                {
                    subdirectoryInfoDataIsLoading ? (
                        <Box>
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </Box>
                    ) : (
                        <List dense={false}>
                            {
                                subdirectoryFileInfoData?.map(dataInfo => {
                                    return (
                                        <ListItem key={dataInfo.fileId} secondaryAction={
                                            (!isFileDownloading) ? (<IconButton onClick={() => downloadFile(dataInfo.fileId, dataInfo.fileName)} edge="end" aria-label="download">
                                                <DownloadIcon />
                                            </IconButton>) : (<CircularProgress />)
                                        }>
                                            <ListItemText primary={dataInfo.fileName} secondary={humanFileSize(dataInfo.size)} />

                                        </ListItem>)
                                })
                            }
                        </List>
                    )
                }

            </Grid>
        </Grid >
    )
}

export default FileBox;