import React from 'react';
import { Layout } from 'antd';
import { connectAlita } from 'redux-alita';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import "./layout/sideMenu"
import './App.less';
import Routes from './routes';
import routes from './routes/config';
import SideMenu from './layout/sideMenu/index';

const { Header, Sider, Content } = Layout;
type AppProps = {
  setAlitaState: (param: any) => void;
  auth: any;
  responsive: any;
};

class App extends React.Component<AppProps> {
  state = {
    collapsed: true,
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  componentWillMount() {
    const { setAlitaState } = this.props
    let data= {
      userInfo: JSON.parse(sessionStorage.getItem('userInfo') || "{}"),
      menu: JSON.parse(sessionStorage.getItem('menu') || "{}"),
      token: sessionStorage.getItem('token')
    }
    setAlitaState({ stateName: 'auth', data: data });
  }
  render() {
    const { auth = { data: {} } } = this.props;
    console.log(this.props)
    const { menu } = auth.data || { menu: [] };
    return (
      <div className="App">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="app-aside">
            <div className="logo" />
            <SideMenu menus={[...routes.menus, ...menu]} {...this.props}></SideMenu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Routes auth={auth} />
            </Content>
          </Layout>
        </Layout>
      </div >
    );
  }
}

export default connectAlita(['auth', 'responsive'])(App);
