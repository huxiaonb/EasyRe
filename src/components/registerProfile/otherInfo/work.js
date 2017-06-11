import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import Card from 'antd/lib/card'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'
import DatePicker from 'antd/lib/date-picker'


import 'antd/lib/style/index.less';
import 'antd/lib/grid/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/select/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/badge/style/index.less';
import 'antd/lib/date-picker/style/index.less';


const FormItem = Form.Item;
const {RangePicker } = DatePicker;
let uuid = 0;
class WorkExp extends React.Component {
    remove(k){
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 0) {
            return;
        }
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add(){
        uuid++;
        if(uuid>5) return;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    render(){
         const { getFieldDecorator, getFieldValue  } = this.props.form;
         const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
                md: {span:12}
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
                md: {span:12}
            },
        };
        const noti = (
            <Badge dot>
                <span title='新增的工作经历' style={{color:'#108ee9',cursor:'pointer'}}>
                    新增的工作经历
                </span>
            </Badge>
        )

        getFieldDecorator('keys', { initialValue: []});
        const keys = getFieldValue('keys');
        const formItems = keys.map((key, index) => {
            return (
                <Card title={noti} key={`${key}`} style={{marginTop:'20px'}} extra={<span title='删除此列'><Icon onClick={() => this.remove(key)} style={{cursor: 'pointer',transition: 'all .3s'}} type='close'/></span>}>  
                    <FormItem
                        {...formItemLayout}
                        label="公司名称"
                        name={`title_${key}`}
                        hasFeedback
                        key={`title_${key}`}>
                        {getFieldDecorator(`title_${key}`, {
                            rules:[{
                                type:'string', pattern:/^[A-Za-z0-9_\u4e00-\u9fa5]{1,50}$/, message:'请输入有效的公司名称！'
                            },{
                                required:true,message:'请输入有效的公司名称！'
                            }]
                        })(
                            <Input placeholder='请输入公司名称！'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="起止日期"
                        name={`rangeTime_${key}`}
                        hasFeedback
                        key={`rangeTime_${key}`}>
                        {getFieldDecorator(`rangeTime_${key}`, {
                             rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                        })(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职位"
                        name={`position_${key}`}
                        hasFeedback
                        key={`position_${key}`}>
                        {getFieldDecorator(`position_${key}`, {
                            rules: [{
                                required: true, 
                                whitespace : true,
                                maxLenght : 10,
                                message: '请输入有效的职位！'
                            }]
                        })(
                            <Input placeholder='请输入职位！'/>                        
                    )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="薪资范围"
                        name={`salary_${key}`}
                        hasFeedback
                        key={`salary_${key}`}>
                        {getFieldDecorator(`salary_${key}`, {
                            rules:[{
                                required:true, message:'请选择薪资范围！'
                            }],
                            initialValue:'0'
                        })(
                            <Select>
                                <Option value="0">2000以下</Option>
                                <Option value="1">2000~3000</Option>
                                <Option value="2">3000~4000</Option>
                                <Option value="3">4000~5000</Option>
                                <Option value="4">5000~10000</Option>
                                <Option value="5">10000以上</Option>
                        </Select>
                        )}
                    </FormItem>
                 
                </Card>
            )});
            return(
                
                /* 工作经历 */
                <Card title="工作经历">
                    <Form layout='inline'>
                    <Card>
                     <FormItem
                        {...formItemLayout}
                        label="公司名称"
                        name='title_'
                        hasFeedback
                        key='title_'>
                        {getFieldDecorator('title_', {
                            rules:[{
                                type:'string', pattern:/^[A-Za-z0-9_\u4e00-\u9fa5]{1,50}$/, message:'请输入有效的公司名称！'
                            },{
                                required:true,message:'请输入有效的公司名称！'
                            }]
                        })(
                            <Input placeholder='请输入公司名称！'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="起止日期"
                        name='rangeTime_'
                        hasFeedback
                        key='rangeTime_'>
                        {getFieldDecorator('rangeTime_', {
                             rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                        })(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职位"
                        name='position_'
                        hasFeedback
                        key='position_'>
                        {getFieldDecorator('position_', {
                            rules: [{
                                required: true, 
                                whitespace : true,
                                maxLenght : 10,
                                message: '请输入有效的职位！'
                            }]
                        })(
                            <Input placeholder='请输入职位！'/>                        
                    )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="薪资范围"
                        name='salary_'
                        hasFeedback
                        key='salary_'>
                        {getFieldDecorator('salary_', {
                            rules:[{
                                required:true, message:'请选择薪资范围！'
                            }],
                            initialValue:'0'
                        })(
                            <Select>
                                <Option value="0">2000以下</Option>
                                <Option value="1">2000~3000</Option>
                                <Option value="2">3000~4000</Option>
                                <Option value="3">4000~5000</Option>
                                <Option value="4">5000~10000</Option>
                                <Option value="5">10000以上</Option>
                        </Select>
                        )}
                    </FormItem>
                    </Card>
                        {formItems}
                    </Form>
                    <div>
                        <Button type="primary" size='large' icon="plus-circle-o" onClick={this.add.bind(this)} style={{width:'100%'}}>新增工作经历</Button>
                    </div>
                </Card>
            )}
}

export default Form.create()(WorkExp)