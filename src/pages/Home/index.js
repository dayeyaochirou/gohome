import React, { Component } from 'react';
import {axios} from "../../utils/request";
import { Carousel} from 'antd-mobile';
import nav1 from "../../assets/images/nav-1.png";
import nav2 from "../../assets/images/nav-2.png";
import nav3 from "../../assets/images/nav-3.png";
import nav4 from "../../assets/images/nav-4.png";
import styles from "./index.module.scss";
import {REACT_APP_API_URL} from '../../utils/utils';
import Search from '../../components/Search'
class index extends Component {
  state = {
    swiperList: [],
    imgHeight: 176,
    //导航栏
    navs: [{ id: 0, title: '整租', img: nav1 }, { id: 1, title: '合租', img: nav2 }, { id: 2, title: '地图找房', img: nav3 }, { id: 3, title: '去出租', img: nav4 }],
    //租房小组
    homeGroups:[],
    //最新资讯
    homeNews:[]
  }
  //在组件挂载完成时候发请求
  componentDidMount() {
    axios.get("/home/swiper")
      .then(res => {
        this.setState({ swiperList: res.body });
      })
    axios.get("/home/groups")
      .then(res=>{
        this.setState({homeGroups:res.body})
      })
    axios.get("/home/news")
      .then(res=>{
        this.setState({homeNews:res.body})
      })
  }

  render() {
    // console.log('打印了多少次')
    const {swiperList}=this.state;
    return (
      <div className={styles.hk_home}>
        <div className={styles.search_father}>
          <Search/>
        </div>
        {/* 轮播图 开始 */}
        <div className="home_swiper">
          {/* 在请求完成后，组件中的state有值时再渲染跑马灯 */}
          {swiperList.length&& <Carousel
            autoplay
            infinite
          >
            {this.state.swiperList.map(val => (
              <a
                key={val.id}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={REACT_APP_API_URL+val.imgSrc}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // 解决图片高度的bug使用 
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>}
         
        </div>
        {/* 轮播图 结束 */}
         {/* 导航 开始 */}
        <nav className={styles.home_nav}>
          {this.state.navs.map(v =>
            <div key={v.id} className={styles.nav_item}>
              <img src={v.img} alt="" />
              <p>{v.title}</p>
            </div>
          )}
        </nav>
        {/* 导航 结束 */}
        {/* 租房小组开始 */}
        <div className= {styles.home_group}>
          <div className={styles.home_group_title}>
          <span className={styles.group_title_title}>租房小组</span>
            <span className={styles.group_title_more}>更多</span>
          </div>
          <div className={styles.home_group_body}>
            {this.state.homeGroups.map(v=><div className={styles.home_body_item} key={v.id}>
                <div className={styles.home_group_item_name}>
                  <div className={styles.item_name_1}>{v.title}</div>
                  <div className={styles.item_name_2}>{v.desc}</div>
                </div>
                <div className={styles.home_group_item_img}>
                  <img src={REACT_APP_API_URL + v.imgSrc} alt="" />
                </div>
            </div>)}
          </div>
        </div>
        {/* 租房小组结束 */}
        {/* 最新资讯开始 */}
        <div className={styles.home_news}>
          <div className={styles.home_news_title}>
            最新资讯
          </div>
          <div className={styles.home_news_body}>
            {this.state.homeNews.map(v=><div className={styles.news_body_item} key={v.id}>
              <div className={styles.body_item_img}>
                <img src={REACT_APP_API_URL + v.imgSrc} alt=""/>
              </div>
              <div className={styles.body_item_info}>
                <div className={styles.item_info_title}>{v.title}</div>
                <div className={styles.item_info_foot}>
                  <span>{v.from}</span>
                  <span>{v.date}</span>
                </div>
              </div>
            </div>)}
          </div>
        </div>
        {/* 最新资讯结束 */}
      </div>
    );
  }
}
export default index;