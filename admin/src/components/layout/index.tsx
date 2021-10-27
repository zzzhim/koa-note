import { IRouteComponentProps } from 'umi'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { useState } from 'react';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout

function LayoutRender({
  children,
  location,
  route,
  history,
  match
}: IRouteComponentProps) {
  const [ collapsed, setCollapsed ] = useState<boolean>(false)

  const toggleCollapsed = () => {
    setCollapsed(bool => !bool)
  }

  return (
    <>
      <Layout style={{ height: '100vh', }}>
        <Header className="header">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout style={{ height: '100%', }}>
          <Sider
            width={200}
            collapsed={collapsed}
            onCollapse={toggleCollapsed}
            style={{ overflowY: 'auto', }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              theme='dark'
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理">
                <Menu.Item key="1" onClick={() => history.push('/article/list')}>文章列表</Menu.Item>
                <Menu.Item key="2" onClick={() => history.push('/article/add')}>新建文章</Menu.Item>
              </SubMenu>
              {/* <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" icon={<NotificationOutlined />} title="subnav 4">
                <Menu.Item key="13">option9</Menu.Item>
                <Menu.Item key="14">option10</Menu.Item>
                <Menu.Item key="15">option11</Menu.Item>
                <Menu.Item key="16">option12</Menu.Item>
              </SubMenu>
              <SubMenu key="sub5" icon={<NotificationOutlined />} title="subnav 5">
                <Menu.Item key="19">option9</Menu.Item>
                <Menu.Item key="110">option10</Menu.Item>
                <Menu.Item key="111">option11</Menu.Item>
                <Menu.Item key="112">option12</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0' }}>
            <Breadcrumb style={{ padding: '16px 24px', backgroundColor: '#FFFFFF' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                height: '100%',
                overflow: 'auto'
              }}
            >
              { children }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutRender