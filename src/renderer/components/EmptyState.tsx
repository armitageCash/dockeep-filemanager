import React from 'react';
import { Empty, Button } from 'antd';

interface Props {
  description: string;
  imageUrl: string;
  actionButtonText: string;
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed';
}

const EmptyState: React.FC = (props: Props) => {
  return (
    <Empty
      image={props.imageUrl}
      imageStyle={{
        height: 60,
      }}
      description={<span>{props.description}</span>}
    >
      <Button type={props.type}>{props.actionButtonText}</Button>
    </Empty>
  );
};

export default EmptyState;
