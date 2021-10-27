import React, { useEffect, useState } from 'react'
import styles from './index.scss'
// import { articleList } from '../../../api/article'
import { Menu, Button } from 'antd'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu

export default function Page() {
  const [ collapsed, setCollapsed ] = useState<boolean>(false)

  const toggleCollapsed = () => {
    setCollapsed(bool => !bool)
  }

  useEffect(() => {
    // articleList({})
    
    return () => {
      
    }
  }, [])

  return (
    <div>
      <div style={{ width: 256 }}>
        {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button> */}
      </div>
    </div>
  );
}
