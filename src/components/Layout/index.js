import React from 'react';

import { TabBar } from 'antd-mobile';

import { withRouter } from "react-router-dom";
 class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
    };
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21b97a"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<i className="iconfont icon-ind"></i>}
            selectedIcon={<i className="iconfont icon-ind"></i>}
            selected={this.props.match.url === "/"}
            onPress={() => {
              this.props.history.push("/")
            }}
          >
            {this.props.match.url === "/" && this.props.children}
          </TabBar.Item>
          <TabBar.Item
            title="找房"
            key="List"
            icon={<i className="iconfont icon-findHouse"></i>}
            selectedIcon={<i className="iconfont icon-findHouse"></i>}
            selected={this.props.match.url === "/List"}
            onPress={() => {
              this.props.history.push("/List")
            }}
          >
            {this.props.match.url === "/List" && this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-infom"></i>}
            selectedIcon={<i className="iconfont icon-infom"></i>}
            title="资讯"
            key="News"
            selected={this.props.match.url === "/News"}
            onPress={() => {
              this.props.history.push("/News")
            }}
          >
             {this.props.match.url === "/News" && this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-my"></i>}
            selectedIcon={<i className="iconfont icon-my"></i>}
            title="我的"
            key="My"
            selected={this.props.match.url === "/Profile"}
            onPress={() => {
              this.props.history.push("/Profile")
            }}
          >
            {this.props.match.url === "/Profile" && this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(Layout);