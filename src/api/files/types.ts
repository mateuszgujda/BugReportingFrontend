export type GetFileInfo = {
    id: string
}

export type GetFile = {
    id: string
}

export type GetSubdirectoryInfo = {
    subdirectoryId: string,
    fileType?: string
}


export type GetSubdirectoryFiles = {
    subdirectoryId: string,
    fileType?: string
}

export type FileInfo  = {
    fileId : string,
    fileName: string,
    fileType : string,
    mimeType : string,
    size : number,
}