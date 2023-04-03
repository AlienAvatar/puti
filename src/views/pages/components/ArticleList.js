import { Divider, List, Avatar } from 'antd';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators as articleActionCreators } from '../../../store/article';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, fetchAllArticlePosts } from '../../../store/article/Reducer';
import { Skeleton, Pagination, Alert, Space } from 'antd';
import { LikeFilled } from '@ant-design/icons';
import '../assets/css/main.css';

const DetailsClickHandle = (num) => {
    window.location.href = window.location.origin + '/detail/' + num;
}

function ArtList(props) {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector((state) => state.articleReducer.status);
    const error = useSelector((state) => state.articleReducer.error);

    let defaultPageIndex = 1;
    //默认每页显示5条
    let defaultPageSize = 5;
    let paramData = {
        "pageIndex" : defaultPageIndex,
        "pageSize" : defaultPageSize
    }
    
    useEffect(()=>{
        if (postStatus === 'idle') {
            dispatch(fetchAllArticlePosts(paramData));
        }
    },[postStatus, dispatch])

    const PageHandleChange = (page,pageSize)=>{
        let paramData = {
            "pageIndex" : page,
            "pageSize" : pageSize
        }
        dispatch(fetchAllArticlePosts(paramData));
    }

    let content;
    let data;
    let footerList;

    if(postStatus === 'loading'){
        data = [<Skeleton active />];
        
        content = <List
                    size="normal"
                    header={<div>Header</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => { return (<List.Item>{item}</List.Item> )}}
                  />
        
    }else if(postStatus == 'succeeded'){
        const articleData = props.articleData.articleReducer.articleData.data;
        const list = articleData.list;
        //每页条数
        const pageSizeOptions = articleData.pageSize;

        const titleArr = [];
        list.map((item) => {
            titleArr.push(item.title);
        })
        

        footerList = <Pagination total={articleData.total}
                        defaultCurrent = {defaultPageIndex}
                        defaultPageSize = {pageSizeOptions}
                        current = {articleData.pageIndex}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total) => `Total ${total} items`}
                        onChange={ PageHandleChange }
                    />
                               
        content = <List
                        className="artlist-list"
                        itemLayout="horizontal"
                        size="normal"
                        header={<div>Header</div>}
                        footer={footerList}
                        bordered
                        dataSource={list}
                        renderItem={(item) => { 
                            return (
                                    <List.Item>
                                        <List.Item.Meta
                                        avatar={<Avatar className="artlist-list-avatar" src={item.avatar} />}
                                        title={item.author}
                                        description={item.title}
                                        >
                                        </List.Item.Meta>
                                        <Space>
                                            <a href="#" onClick={ ()=>{ DetailsClickHandle(item.num)} }>查看详情</a>
                                            <LikeFilled />{item.endorse}
                                        </Space>
                                    </List.Item>
                            )}}
                    />
    }else if(postStatus == 'failed'){
        content = <>
                    <Alert
                        message="Error"
                        description="无法查询所有文章，请联系管理员"
                        type="error"
                        showIcon
                    />
                    <List
                        size="normal"
                        bordered
                        dataSource={data}
                        renderItem={(item) => { return (<List.Item>{item}</List.Item> )}}
                    />
                  </>
    }
    
    return (
        <>
            {content}
        </>
    )
}

//这个函数来指定如何把当前store state映射到展示组件的props中
const mapStateToProps = state => {
    return {
        articleData : state,
    }
}

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
const mapDispatchToProps = dispatch => {
    return{
        articleDataFn : bindActionCreators(articleActionCreators, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArtList);

//export default ArtList;