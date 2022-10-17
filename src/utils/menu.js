import {
  BarChartOutlined,
  LaptopOutlined,
  DatabaseOutlined,
  HistoryOutlined,
  CopyOutlined,
  SettingOutlined,
  ApiOutlined,
  ProfileOutlined,
  FileImageOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import React from 'react';

let menu = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: <BarChartOutlined />,
  },
  {
    key: 'node',
    name: 'Node',
    icon: <LaptopOutlined />,
  },
  {
    key: 'volume',
    name: 'Volume',
    icon: <DatabaseOutlined />,
    child: [
      {
        key: 'detail',
        name: 'Detail',
      },
    ],
  },
  {
    key: 'recurringJob',
    name: 'Recurring Job',
    icon: <HistoryOutlined />,
  },
  {
    key: 'backup',
    name: 'Backup',
    icon: <CopyOutlined />,
  },
  {
    key: 'setting',
    name: 'Setting',
    icon: <SettingOutlined />,
    child: [
      {
        show: true,
        key: 'setting',
        name: 'General',
        icon: <SettingOutlined />,
      },
      {
        show: true,
        key: 'engineimage',
        name: 'Engine Image',
        icon: <ApiOutlined />,
        child: [
          {
            key: 'detail',
            name: 'Detail',
          },
        ],
      },
      {
        show: true,
        key: 'orphanedData',
        name: 'Orphaned Data',
        icon: <ProfileOutlined />,
      },
      {
        show: true,
        key: 'backingImage',
        name: 'Backing Image',
        icon: <FileImageOutlined />,
      },
      {
        show: true,
        key: 'instanceManager',
        name: 'Instance Manager Image',
        icon: <ApartmentOutlined />,
      },
    ],
  },
]

export default menu
