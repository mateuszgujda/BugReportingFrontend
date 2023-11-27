
import ImageIcon from '@mui/icons-material/Image';
import { CircularProgress, Divider, Grid, Icon, IconButton, ImageList, ImageListItem, ImageListItemBar, Skeleton, Typography, styled } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box } from '@mui/system';
import { useFilesApi } from '../../api/files/api';
import { useEffect, useState } from 'react';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import DownloadIcon from '@mui/icons-material/Download';
import { LazyLog } from 'react-lazylog';
import Loading from 'react-lazylog/build/Loading';

export interface BugfileBoxProps {
    bugfileId?: string
}

const BugfileBox = (props: BugfileBoxProps) => {

    const {
        getFile: { query: getFile, data: fileData, isLoading: fileIsLoading },
        getFileInfo: { query: getFileInfo, data: fileInfoData, isLoading: fileInfoIsLoading }
    } = useFilesApi();



    const [bugfileFile, setBugfileFile] = useState<string | ArrayBuffer | null>(null);
    const [isDownloadingFile, setIsDownloadingFile] = useState(false);
    useEffect(() => {
        if (props.bugfileId) {
            getFileInfo({ id: props.bugfileId });
            getFile({ id: props.bugfileId });
        }

    }, [props.bugfileId]);

    function humanFileSize(size: number) {
        var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }



    useEffect(() => {
        if (fileData) {
            blobToText(fileData).then(res => { console.log(res); setBugfileFile(res) });
        }
    }, [fileData]);

    function blobToText(blob: Blob) {
        return new Promise<string | ArrayBuffer | null>((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsText(blob);
        });
    }

    const downloadBugfie = () => {
        if (fileData && fileInfoData) {
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

    const DisplayBugfileData = () => {

        if (props.bugfileId) {
            return (
                bugfileFile ?
                    <LazyLog enableSearch text={bugfileFile?.toString() || ""} selectableLines caseInsensitive />
                    : <Loading />
            )
        }
        else {
            return <Typography variant="h5" component="span">
                No Bugfile data
            </Typography>
        }
    };

    return (<Box>
        <Grid alignItems={"center"} container spacing={2} sx={{ marginBottom: "1em" }} >
            <Grid xs={12} item >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                    <Box sx={{ display: "flex" }}>
                        <Icon >
                            <TroubleshootIcon />
                        </Icon>
                        <Typography variant="h5" component="span" justifyContent={"center"}>
                            Bugfile
                        </Typography>
                    </Box>
                    {
                        (!isDownloadingFile) ? (<IconButton onClick={() => downloadBugfie()} edge="end" aria-label="download">
                            <DownloadIcon />
                        </IconButton>) : (<CircularProgress />)
                    }
                </Box>
                <Divider sx={{ marginBottom: "1em" }} />
            </Grid>
            <Grid xs={12} item minHeight={"500px"} width={"100%"}>
                {DisplayBugfileData()}
            </Grid>
        </Grid>
    </Box>)
}

export default BugfileBox;