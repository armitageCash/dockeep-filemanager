import React, { useEffect, useState } from 'react';
import { Flex, Input, Card, Col, Row, FloatButton } from 'antd';
import {
  CustomerServiceOutlined,
  ScanOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import LocalStorageService from '@renderer/shared/localstorage';
import Datatable from '@components/Datatable';
import FileHandler from '@renderer/shared/file';

declare global {
  interface Window {
    Dockeep: any;
  }
}

const { Search } = Input;

const Workspace: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [folder, setFolder] = useState<string | ''>('');
  const [files, setFiles] = useState<File[]>([]);

  const suffix = (
    <ScanOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  useEffect(() => {
    window.Dockeep.onDirectoryChange(
      async (event: { filePath: string; type: string }) => {
        console.log('event', event);
        if (event.type === 'add') {
          const fileHandler = new FileHandler(event.filePath);
          const file: File = await fileHandler.createFile();
          setFiles([...files, file]);
        }
      },
    );
    setFolder(LocalStorageService.getData()?.data?.scannerDir || null);
    return () => {
      window.Dockeep.stopWatching();
    };
  }, []);

  return (
    <React.Fragment>
      <Row gutter={4}>
        <Col span={24}>
          <Card title='Carpeta de scanner'>
            <Search
              placeholder='Directorio de archivos'
              enterButton='Seleccionar'
              value={folder}
              size='large'
              onClick={async () => {
                const selectedFolder = await window.Dockeep.selectFolder();
                if (selectedFolder) {
                  setFolder(selectedFolder);
                  window.Dockeep.watchDirectory(selectedFolder);
                  LocalStorageService.saveData({
                    data: {
                      scannerDir: selectedFolder,
                    },
                  });
                }
              }}
              suffix={suffix}
              onSearch={async () => {
                const selectedFolder = await window.Dockeep.selectFolder();
                if (selectedFolder) {
                  setFolder(selectedFolder);
                  window.Dockeep.watchDirectory(selectedFolder);
                  LocalStorageService.saveData({
                    data: {
                      scannerDir: selectedFolder,
                    },
                  });
                }
              }}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Datatable
            style={{ width: '100%' }}
            items={files.map((f: File, index: number) => ({
              key: index,
              dateCreated: new Date(f.lastModified),
              title: f.name,
              size: FileHandler.formatFileSize(f.size),
              type: FileHandler.getExtension(f.name),
              tag: FileHandler.getExtension(f.name),
              status: 'Pendiente',
            }))}
            selectedRows={selectedKeys}
            onSelectedRow={(values) => {
              console.log('values', values);
              setSelectedKeys(values);
            }}
            size='small'
          />
        </Col>
      </Row>
      {selectedKeys.length > 0 ? (
        <FloatButton
          shape='circle'
          type='primary'
          style={{ insetInlineEnd: 24 }}
          icon={<UploadOutlined />}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Workspace;
