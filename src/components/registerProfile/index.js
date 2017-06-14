import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


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
import OtherInfo from './otherInfo/index';

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
  static childContextTypes = {
        profile: PropTypes.object,
        updateProfile: PropTypes.func
    }

  getChildContext(){
      return {
          profile: this.state.info,
          updateProfile : this.updateProfile.bind(this)
      }
  }

  state = {
      current: 0,
      info:{
        personal:{},
        family:{family:[]},
        otherInfo:{workExps:[],edus:[]}
      }
    };
  updateProfile(obj){
    let {info} = this.state;
    switch(obj.flag){
      case 1 :
        info = Object.assign(info,{personal : obj.personalInfo})
        break;
      case 2 :
        info = Object.assign(info,{family : {family:obj.family}})
        break;
      case 3 :
        info = Object.assign(info,{otherInfo : obj.otherInfo})
        break;

    }

    this.setState({info:info})
  }  
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  handleSubmit(){
    //callApi
    message.success('Processing complete!');
  }

  componentWillMount(){
    console.log('好无辜啊！ ヽ(.◕ฺˇд ˇ◕ฺ;)ﾉ (｡◕ฺˇε ˇ◕ฺ｡）');
  }
  render() {
    const { current } = this.state;
    let { personal, family, otherInfo } = this.state.info;
    const myStep = (
      <div style={{textAlign:'left'}}>
        <Steps current={current} style={{marginBottom:'50px'}}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
          {steps[this.state.current].content=='0' && <PersonalInfo  next={this.next.bind(this)}/>}
          {steps[this.state.current].content=='1' && <FamilyInfo prev={this.prev.bind(this)} next={this.next.bind(this)}/>}
          {steps[this.state.current].content=='2' && <OtherInfo  prev={this.prev.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />}
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