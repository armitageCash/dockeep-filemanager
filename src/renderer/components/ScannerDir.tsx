import React, { useState } from 'react';
import { Input } from 'antd';
import { ScanOutlined } from '@ant-design/icons';

type ScannerDirProps = {
  onFolderSelect: (folder: string) => void;
};

const ScannerDir: React.FC<ScannerDirProps> = ({ onFolderSelect }) => {
  const [folder, setFolder] = useState<string>('');
  const suffix = <ScanOutlined style={{ fontSize: 16, color: '#1677ff' }} />;

  const handleSelectFolder = async () => {
    const selectedFolder = await window.Dockeep.selectFolder();
    setFolder(selectedFolder);
    window.Dockeep.watchDirectory(selectedFolder);
    onFolderSelect(selectedFolder);
  };

  return (
    <Input.Search
      placeholder='Directorio de archivos'
      enterButton='Seleccionar'
      value={folder}
      size='large'
      onClick={handleSelectFolder}
      suffix={suffix}
      onSearch={handleSelectFolder}
    />
  );
};

export default ScannerDir;
