import React, {useImperativeHandle} from 'react';
import ReactDOM from 'react-dom';
import { EditorState, ContentState, convertToRaw, ContentToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../assets/css/editor.css';
import { useState, useEffect  } from 'react';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { Button, Radio, Space, Divider, Col, Row } from 'antd';
import { InfoCircleOutlined, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Input, Tooltip, Form } from 'antd';

function CusEditor(props) {
    //console.log('props',props);
    //创建当前editorState的状态
    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );

    const [ convertedContent, setConvertedContent ] = useState(null);
    //是否预览
    const [ review, setReview ] = useState(false);
    
    let author = "匿名";

    useEffect(()=>{
      //从editor state获取content state，并转换为html
      let html = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(html);
    },[editorState])

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
      if(typeof values.title === 'undefined'){
        const notificationParam = {
          message : "请输入标题",
          description : "",
          icon : <ExclamationCircleOutlined />
        }
        props.openNotification('top',notificationParam);
        return;
      }
      if(typeof author === 'undefined'){
        const notificationParam = {
          message : "无法获取登录名，请重新登录",
          description : "",
          icon : <ExclamationCircleOutlined />
        }
        props.openNotification('top',notificationParam);
        return;
      }
      const contentJson = convertToRaw(editorState.getCurrentContent());
      const contentStr = JSON.stringify(contentJson);
      console.log("convertedContent",convertedContent);
      console.log('reviewHTML',reviewHTML);
      
      if(props.postStatus === 'idle'){
        const postParam = {
          "num" : "",
          "content" : convertedContent,
          "title" : values.title,
          "author" : author
        };
        props.saveClick(postParam);
      }
    }
    const onFinishFailedHandle = () => {
      alert('onFinishFailedHandle')
      console.log('onFinishFailedHandle')
    }

    
    const reviewHTML = <div
                        className="preview"
                        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
                      </div>
   
    
    const editHTML = (
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                      />
                    )

    const reviewButton = <Button type="primary" size='large' onClick={hanldeReviewClick}>
                          预览
                        </Button>
    const editButton = <Button type="primary" size='large'  onClick={hanldeEditClick}>
                          编辑
                        </Button>
                        
    const buttonChoose = review ? editButton : reviewButton;
    const htmlChoose = review ? reviewHTML : editHTML;

    
    return (
          <Row>
            <Col span={6}></Col>
            <Col  span={12}>
              {htmlChoose}
              <div>
                <Form
                  className='editor-form'
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600, marginTop : 20 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinishHandle}
                  onFinishFailed={onFinishFailedHandle}
                  autoComplete="off"
                >
                    <Form.Item
                      className='editor-title' 
                      label="标题" 
                      name="title">
                      <Input
                        placeholder="请输入标题"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        className="rich-text-title"
                        suffix={
                          <Tooltip title="标题信息不超过14字">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip>
                        }
                        rules={[{ required: true, message: '请输入标题' }]}
                      />
                    </Form.Item>

                    <Form.Item
                      className='editor-title' 
                      label="作者"
                      name="author">
                      <Input
                        disabled
                        placeholder={author}
                        className="rich-text-title"
                        suffix={
                          <Tooltip title="不可更改">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip>
                        }
                        rules={[{ required: true, message: '请输入用户名' }]}
                      >
                      </Input>
                    </Form.Item>
                      <Row>
                        <Col span={10}></Col>
                        <Col span={14}>
                          <Form.Item>
                            {buttonChoose}
                            <Button type="primary" size='large' htmlType='submit' style={{marginLeft : 20}}>
                              保存
                            </Button>
                          </Form.Item>
                        </Col>
                    </Row>    
               </Form>
              </div>
              </Col>
              <Col span={6}></Col>
            </Row>
    )
}

export default CusEditor;