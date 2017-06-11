import React from 'react';
import ReactDOM from 'react-dom';

import Layout from 'antd/lib/Layout'
import Steps from 'antd/lib/steps'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'

import 'antd/lib/style/index.less';
import 'antd/lib/grid/style/index.less';
import 'antd/lib/layout/style/index.less'
import 'antd/lib/steps/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/message/style/index.less';

import PersonalInfo from './personalInfo';
import FamilyInfo from './familyInfo';
import OtherInfo from './otherInfo';

const { Header, Content, Footer, Sider } = Layout;

const Step = Steps.Step;

const steps = [{
  title: '基本信息',
  content: '0',
}, {
  title: '家庭信息',
  content: '1',
}, {
  title: '其他信息',
  content: '2',
}];

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
      current: 0,
      info:{
        personal:{
          name:'',
          gender:'',
          folk:'',
          birthDate:'',
          healthState:'',
          idCardNumber:'',
          homeAddress:'',
          currentAddress:'',
          phoneNumber:'',
          email:'',
          qqNumber:'',
          photo:0,
          flag:0
        },
        family:{},
        OtherInfo:{}
      }
    };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    const myStep = (
      <div style={{textAlign:'left'}}>
        <Steps current={current} style={{marginBottom:'50px'}}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
          {steps[this.state.current].content=='0' && <PersonalInfo/>}
          {steps[this.state.current].content=='1' && <FamilyInfo/>}
          {steps[this.state.current].content=='2' && <OtherInfo/>}
        </div>
        <div className="steps-action" style={{lineHeight:9,textAlign:'center'}}>
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>确认提交</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
        </div>
      </div>
    );
    return(
      <Layout>
          <Header style={{ padding: 0, textAlign:'center', background: '#108ee9',color: '#ffffff', fontSize:'24px'}} >入职信息录入</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 ,textAlign:'center'}}>
              {myStep}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
              M & G PRESENTS ©2017  (づ￣ 3￣)づ 
          </Footer>
      </Layout>
    )
  }
}

export default ($el, args) => {
    $el.each(function() {ReactDOM.render(<Index args = { args } />, this);})
}