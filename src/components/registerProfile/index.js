import React from 'react';
import ReactDOM from 'react-dom';

import Steps from 'antd/lib/steps'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'

import 'antd/lib/input/style/steps.less';
import 'antd/lib/input/style/button.less';
import 'antd/lib/input/style/message.less';

const steps = [{
  title: 'First',
  content: 'First-content',
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
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
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
          {steps[this.state.current].title==1 && <PersonalInfo/>}
          {steps[this.state.current].title==2 && <FamilyInfo/>}
          {steps[this.state.current].title==3 && <OtherInfo/>}
        </div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }
}
