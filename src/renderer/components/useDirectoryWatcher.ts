import { useEffect } from 'react';

type DirectoryWatcherProps = (event: any) => void;

const useDirectoryWatcher = (onFileChange: DirectoryWatcherProps) => {
  useEffect(() => {
    window.Dockeep.onDirectoryChange(onFileChange);
    return () => {
      window.Dockeep.stopWatching();
    };
  }, [onFileChange]);
};

export default useDirectoryWatcher;
