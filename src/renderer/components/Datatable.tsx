import React, { CSSProperties, useState } from 'react';
import { Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('es');

type DataType = {
  key: number;
  title: string;
  type: string;
  size: string;
  tag: string;
  dateCreated: Date;
};

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

type DatatableProps = {
  items: DataType[];
  style?: CSSProperties;
  selectedRows?: string[];
  onSelectedRow?: (selectedKeys: string[]) => void;
} & TableProps<DataType>;

const columns: TableColumnsType<DataType> = [
  {
    dataIndex: 'title',
    title: 'Archivo',
  },
  {
    dataIndex: 'type',
    title: 'Tipo',
    render: (tag: string) => (
      <Tag style={{ marginInlineEnd: 0 }} color='cyan'>
        {tag.toUpperCase()}
      </Tag>
    ),
  },
  {
    dataIndex: 'size',
    title: 'Tamaño',
  },

  {
    dataIndex: 'dateCreated',
    title: 'Modificado',
    render: (dateCreated: Date) => <Tag>{dayjs(dateCreated).fromNow()}</Tag>,
  },
  {
    dataIndex: 'status',
    title: 'Estado',
    render: (status: string) => <Tag>{status.toUpperCase()}</Tag>,
  },
];

const Datatable: React.FC<DatatableProps> = ({
  items,
  selectedRows = [],
  onSelectedRow,
  style,
  ...tableProps
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(selectedRows);

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedKeys,
    onChange: (selectedRowKeys) => {
      setSelectedKeys(selectedRowKeys as string[]);
      onSelectedRow?.(selectedRowKeys as string[]);
    },
  };

  return (
    <Table
      style={style}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={items}
      {...tableProps}
    />
  );
};

export default Datatable;
