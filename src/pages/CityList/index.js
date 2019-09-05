import React, { Component } from 'react'
//类似面包屑
import { NavBar, Icon } from 'antd-mobile';
// 准备拿仓库数据
import store from "../../store";
import { citySet } from "../../store/actionCreator";
import { axios } from "../../utils/request"
//牛逼的插件，可视区域渲染的列表
import { List, AutoSizer } from 'react-virtualized';
import styles from "./index.module.scss";
export default class index extends Component {
    state = {
        // 汇总的城市列表数组
        totalCity: [],
         // 右侧 字母映射的数组
    keyArr:[],
    // 右侧 被选中的 索引
    selectIndex:0
    }
    getAllCitys = async () => {
        //  当前城市
        const cityName = store.getState().mapReducer.cityName;
        //获取热门城市
        const cityHot = (await axios("/area/hot")).body
        //获取全部城市
        const cityAll = (await axios("/area/city?level=1")).body
        const totalCity = [
            { "当前城市": [cityName] },
            { "热门城市": cityHot.map(v => v.label) },
        ]
        cityAll.sort((a, b) => a.short.localeCompare(b.short));

        cityAll.forEach(v => {
            //取首字母并大写
            let initial = v.short[0].toUpperCase();
            //定义index数组，由总的城市列表数组中的每一个对象的键名构成
            const index = totalCity.findIndex(vv => {
                // vv = { "当前地址": [cityName] },
                //      { "热门城市": ['广州'] }
                //在这里判断总的城市列表中是否存在有 以首字母作为键名的对象
                if (vv[initial]) {
                    return true;
                } else {
                    return false;
                }
            })
            // 8 判断 数组中是否存在 A 对象了
            if (index === -1) {
                // {A:[]} 不存在 
                totalCity.push(
                    // initial 是一个变量 而不是 对象中的一个属性
                    { [initial]: [v.label] }
                );
            } else {
                // totalCity 数组
                //  totalCity[index] 数组中的某个元素  == 对象 => {"A":[]}
                //  totalCity[index][initial] {"A":[]}.A 
                totalCity[index][initial].push(v.label);
            }
        }) 
        const keyArr=totalCity.map(v=>Object.keys(v)[0]);
        keyArr[0]="#";
        keyArr[1]="热";
        this.setState({ totalCity ,keyArr});
        // console.log(totalCity)
        this.Unsubscribe();
    }
    //定义取消订阅的函数，一会儿在渲染完毕的时候调用
    Unsubscribe=null;
    constructor() {
        super();
        //订阅store数据的变化 subscribe
        this.Unsubscribe=store.subscribe(this.getAllCitys);
        //创建react中的非受控表单，并引用在显示的城市列表上
        this.MainList=React.createRef();
    }
    componentDidMount() {
        //解构仓库中的当前城市，如果里面有值就获取（有值说明是从主页跳过来的，直接获取不需要订阅变化了）
        const { mapReducer } = store.getState();
        if (mapReducer.cityName !== "莫斯科") this.getAllCitys();
    }
   // 城市列表的点击事件
   cityItemClick = (v) => {
    // 1 获取到要跳转的城市了  修订redux中的城市的信息 
   store.dispatch(citySet(v));
   // 2 跳转回上一页
   this.props.history.go(-1);

  }
    //计算行高
    rowHeight = ({ index }) => {
        const item = this.state.totalCity[index];
        // 1 每一个 对象都只有 一个 属性值 = 数组
        // Object.values(item) //  [ [ "北京", "广州", "上海", "深圳" ]  ]
        // Object.values(item)[0].length // [ "北京", "广州", "上海", "深圳" ]
        return (Object.values(item)[0].length + 1) * 40;
    }
    keyLetterClick=(index)=>{
        // console.log(index);
        // console.log(this.MainList);
        this.MainList.current.scrollToRow(index);
      }
    rowsRendered = ({ startIndex }) => {
        if (startIndex === this.state.selectIndex) {
            return;
        }
        this.setState({ selectIndex: startIndex });
    }
    rowRenderer = ({
        key,         // 行数组中的唯一键
        index,       // 集合中的行索引
        style,       //要应用于行的样式对象
        isScrolling
    }) => {
        // 1 获取被循环的元素
        const item = this.state.totalCity[index];
        // console.log(Object.keys(item)[0]); // ["当前城市 "]
        const keyName = Object.keys(item)[0];
        return (
            <div
                key={key}
                style={style}
            >
                <div className={styles.city_list_title}>
                    {keyName}
                </div>
                <div className={styles.city_list_content}>
                    {item[keyName].map((v, i) =>
                        <div onClick={this.cityItemClick.bind(this, v)} key={i} className={styles.list_item} >{v} </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="city_list">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>
                {/*  列表 开始  */}
                <div className={styles.list_content}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                ref={this.MainList}//非受控表单
                                height={height} // 自动设置的高度
                                rowCount={this.state.totalCity.length} // 数组的长度
                                rowHeight={this.rowHeight}  // 行高
                                rowRenderer={this.rowRenderer} // 每一行 如何渲染
                                width={width} // 宽度 
                                onRowsRendered={this.rowsRendered}
                                scrollToAlignment="start"
                            />
                        )}
                    </AutoSizer>
                </div>
                {/*  列表 结束  */}
                {/* 右侧 字母 开始 */}
                <div className={styles.key_list}>
                    {this.state.keyArr.map((v, i) =>
                        <div onClick={this.keyLetterClick.bind(this, i)} key={v} className={styles.key_item + " " + (i === this.state.selectIndex ? styles.active : '')}>{v}</div>
                    )}
                </div>
                {/* 右侧 字母 结束 */}
            </div>

        )
    }




}

