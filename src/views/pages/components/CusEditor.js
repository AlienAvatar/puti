import React, {useImperativeHandle} from 'react';
import ReactDOM from 'react-dom';
import { EditorState, ContentState, convertToRaw, ContentToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../assets/css/editor.css';
import { useState, useEffect  } from 'react';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { Button, Radio, Space, Divider } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip, Form } from 'antd';
import store from '../../../store';

function CusEditor(props) {
    //console.log('props',props);
    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );
    
    const [ convertedContent, setConvertedContent ] = useState(null);
    const [ review, setReview ] = useState(false);
    
    //console.log('store',store.getState().loginReducer.userData.userBeanVo.nickName)
    const [ author, setAuthor ] = useState("匿名");
    useEffect(()=>{
      //从editor state获取content state，并转换为html
      let html = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(html);
      
    },[editorState])

    useEffect(()=>{
      // if(store.getState().loginReducer){
      //   setAuthor(store.getState().loginReducer.userData.userBeanVo.nickName);
      // }
    },[])
    
    const createMarkup = (html) => {
      return {
        __html : DOMPurify.sanitize(html)
      }
    };

    const hanldeReviewClick = () => {
      setReview(true);
      
    }

    const hanldeEditClick = () => {
      setReview(false);
    }

    const onFinishHandle = (values) => {
      const contentJson = convertToRaw(editorState.getCurrentContent());
      const contentStr = JSON.stringify(contentJson);

      const postParam = {
        "num" : "",
        "content" : contentStr,
        "title" : values.title,
        "author" : author
      };

      props.saveClick(postParam);
    }
    const onFinishFailedHandle = () => {
      
    }

    const reviewHTML = <div
                        className="preview"
                        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
                      </div>
    
    
    const editHTML = <Editor
                        className = "editor" 
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                    />

    const reviewButton = <Button type="primary" size='large' onClick={hanldeReviewClick}>
                          Review
                        </Button>
    const editButton = <Button type="primary" size='large'  onClick={hanldeEditClick}>
                          Edit
                        </Button>
                        
    const buttonChoose = review ? editButton : reviewButton;
    const htmlChoose = review ? reviewHTML : editHTML;

    
    return (
          <>
            {htmlChoose}
            <div>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinishHandle}
              onFinishFailed={onFinishFailedHandle}
              autoComplete="off"
            >
              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Form.Item 
                  label="标题" 
                  name="title">
                  <Input
                    placeholder="Enter your title"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    className="rich-text-title"
                    suffix={
                      <Tooltip title="标题信息不超过14字">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip>
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="作者"
                  name="author">
                  <Input
                    disabled
                    placeholder={author}
                    suffix={
                      <Tooltip title="不可更改">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip>
                    }
                  >
                  </Input>
                </Form.Item>
              </Space>    
                <Form.Item>
                  {buttonChoose}
                  <Button type="primary" size='large' htmlType='submit'>
                    保存
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </>
    )
}

export default CusEditor;