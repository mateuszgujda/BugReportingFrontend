import { useFile, useFileInfo, useFilesInfoSubdirectory, useFilesSubdirectory } from "./requests";

export const useFilesApi = () => {
    const {
      getFile,
      isLoading: getFileLoading,
      data: getFileData,
    } = useFile();
  
    const {
      getFileInfo,
      isLoading: getFileInfoLoading,
      data: getFileInfoData
    } = useFileInfo();
  
    const {
      queryFilesInfoSubdirectory,
      isLoading: queryFilesInfoSubdirectoryLoading,
      data: queryFilesInfoSubdirectoryData
    } = useFilesInfoSubdirectory();

    const {
      queryFilesSubdirectory,
      isLoading: querFilesSubdirectoryIsLoading,
      data: queryFilesSubdirectoryData
    } = useFilesSubdirectory();

    return {
        getFile: {
        query: getFile,
        isLoading: getFileLoading,
        data: getFileData,
      },
      getFileInfo: {
        query: getFileInfo,
        isLoading: getFileInfoLoading,
        data: getFileInfoData,
      },
      queryFileInfoSubdirectory: {
        query: queryFilesInfoSubdirectory,
        isLoading: queryFilesInfoSubdirectoryLoading,
        data: queryFilesInfoSubdirectoryData
      },
      queryFilesSubdirectory: {
        query: queryFilesSubdirectory,
        isLoading: querFilesSubdirectoryIsLoading,
        data: queryFilesSubdirectoryData
      }
    };
  };