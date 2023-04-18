import { Breadcrumb, Layout, theme, Row, Col, Divider} from 'antd';
import ArtList from '../components/ArticleList';
import CusLayout from '../components/CusLayout';
import { useState } from 'react';
import { connect } from 'react-redux';
import '../assets/css/global.css';
import '../assets/css/main.css';
import PuxianImgSrc from "../assets/main/puxian.jpg";
import WenshuImgSrc from "../assets/main/wenshu.jpg";
import GuanshiyinImgSrc from "../assets/main/guanshiyin.jpg";
import DizangwangImgSrc from "../assets/main/dizangwang.jpg";
import HometitleImgsrc from "../assets/main/home_title.png";
import BgSrc from "../assets/main/bg_main.jpg";

const { Header, Content, Footer } = Layout;


function MainPage(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //登录的信息data需要传值到MainPage
  const [data, setData] = useState("");

  const content = (
              <>
                <Row>
                  <Col span={24}>
                    <div className="g-min-height-675 g-bg-size-cover g-bg-img-hero g-pt-80" style={{backgroundImage : `url(${HometitleImgsrc})`}}>
                      <div className="container g-pos-rel g-z-index-1 text-center g-mt-100">
                        <h3 className="g-color-white g-font-size-30--md g-mx-40">“须菩提！于意云何？如一恒河中所有沙，有如是等恒河，是诸恒河所有沙数，佛世界如是，宁为多不？”
                        <br></br>
                        ——《金刚经》一体同观分
                        </h3>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Divider />
                <Row>
                  <Col span={3}></Col>
                  <Col span={18}>
                    <img className="img-fluid" src={BgSrc} alt="Image Description" />
                  </Col>
                  <Col span={3}></Col>
                </Row>
                <Divider />
                <Row>
                  <Col span={3}></Col>
                  <Col span={18}>
                    <Content className="site-layout" style={{ padding: '30px 150px' }}>
                    <Row>
                      <Col span={12}>
                        <div className="g-pos-rel">
                          <div className="slick-track" style={{ width: '540px', height : 'auto' }}>
                            <div className="slick-slide g-mx-80 g-pt-80">
                              <img className="img-fluid" src={PuxianImgSrc} alt="Image Description" />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="g-mx-80 g-pt-80">
                          <h3 className="mb-4 text-center" style={{ fontSize : '1.75rem'}}>
                            普贤菩萨
                          </h3>
                          <p className="g-font-size-16">佛教菩萨名，梵文Samantabhadra的意译，也曾译为遍吉菩萨，音译为三曼多跋陀罗。
                            普贤菩萨是中国佛教的四大菩萨之一，象征着理德、行德，与象征着智德、正德的文殊菩萨相对应，
                            同为释迦牟尼佛的左、右胁侍。此外，毗卢遮那如来、文殊菩萨、普贤菩萨被尊称为“华严三圣”。</p>
                        </div>
                       </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col span={12}>
                        <div className="g-mx-80 g-pt-80">
                          <h3 className="mb-4 text-center" style={{ fontSize : '1.75rem'}}>
                            文殊菩萨
                          </h3>
                          <p className="g-font-size-16">佛教菩萨名，梵文Maňjuśrī的音译，略称“文殊”，意为“妙德”“妙吉祥”等，新译“曼殊室利”。文殊师利菩萨是中国佛教四大菩萨之一，以论述“般若性空”和“般若方便”的理论著称。</p>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="g-pos-rel">
                          <div className="slick-track" style={{ width: '540px', height : 'auto' }}>
                            <div className="slick-slide g-mx-80 g-top g-pt-80">
                              <img className="img-fluid" src={WenshuImgSrc} alt="Image Description" />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col span={12}>
                        <div className="g-pos-rel">
                          <div className="slick-track" style={{ width: '540px', height : 'auto' }}>
                            <div className="slick-slide g-mx-80 g-pt-80">
                              <img className="img-fluid" src={GuanshiyinImgSrc} alt="Image Description" />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="g-mx-80 g-pt-80">
                          <h3 className="mb-4 text-center" style={{ fontSize : '1.75rem'}}>
                            观世音菩萨
                          </h3>
                          <p className="g-font-size-16">佛教菩萨名，为梵文Avalokiteśvara的意译，亦译作“光世音”，新译“观自在”“观世自在”，音译“阿婆卢吉低舍婆罗”“阿缚卢枳多伊湿伐罗”。阿弥陀佛的左胁侍，“西方三圣”之一。</p>
                        </div>
                       </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col span={12}>
                        <div className="g-mx-80 g-pt-80">
                          <h3 className="mb-4 text-center" style={{ fontSize : '1.75rem'}}>
                            地藏菩萨
                          </h3>
                          <p className="g-font-size-16">佛教菩萨名，为梵文Kṣitigarbha的意译，音译“乞叉底蘖婆”。《地藏十轮经》中称其“安忍不动如大地，静虑深密如秘藏 [1]  ”，故名。也有“地藏王菩萨”的称谓。</p>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="g-pos-rel">
                          <div className="slick-track" style={{ width: '540px', height : 'auto' }}>
                            <div className="slick-slide g-mx-80 g-top g-pt-80">
                              <img className="img-fluid" src={DizangwangImgSrc} alt="Image Description" />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Divider style={{marginTop : '100px'}}>文章列表</Divider>

                    <Breadcrumb style={{ margin: '0 0' }}>
                      {/* <Breadcrumb.Item><ArtCard /></Breadcrumb.Item> */}
                      
                    </Breadcrumb>
                    
                    <ArtList />
                    {/* <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>Content</div> */}
                        
                    </Content>
                  </Col>
                  <Col span={3}></Col>
                </Row>
                </>
                );
              

  return (
    <div className="App">
      <CusLayout children = {content} >
        
      </CusLayout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.loginReducer,
  };
};

export default connect(mapStateToProps)(MainPage);
