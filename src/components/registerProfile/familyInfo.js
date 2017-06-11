import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import Card from 'antd/lib/card'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'


import 'antd/lib/style/index.less';
import 'antd/lib/grid/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/select/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/badge/style/index.less';



const FormItem = Form.Item;
let uuid = 0;
let count = 0;


class FamilyInfo extends React.Component {
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

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
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
                <span title='新增的家庭成员' style={{color:'#108ee9',cursor:'pointer'}}>
                    家庭成员
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
                        label="姓名"
                        name={`name_${key}`}
                        hasFeedback
                        key={`name_${key}`}>
                        {getFieldDecorator(`name_${key}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules:[{
                                type:'string', pattern:/^[\u4e00-\u9fa5]{1,5}$/, message:'请输入有效的姓名！'
                            },{
                                required:true,message:'请输入有效的姓名！'
                            }]
                        })(
                            <Input placeholder='请输入姓名！'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="关系"
                        name={`relationship_${key}`}
                        hasFeedback
                        key={`relationship_${key}`}>
                        {getFieldDecorator(`relationship_${key}`, {
                            rules:[{
                                required:true, message:'请选择关系！'
                            }],
                            initialValue:'父母'
                        })(
                            <Select>
                                <Option value="male">父母</Option>
                                <Option value="female">兄弟</Option>
                                <Option value="female">姐妹</Option>
                        </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="联系手机"
                        name={`mphoneNumber_${key}`}
                        hasFeedback
                        key={`mphoneNumber_${key}`}>
                        {getFieldDecorator(`mphoneNumber_${key}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                type: 'string', pattern: /^[0-9]{11,13}$/, message: '请输入有效的联系手机！'
                            }, {
                                required: true, message: '请输入有效的联系手机！'
                            }]
                        })(
                            <Input placeholder='请输入联系手机！'/>                        
                    )}
                    </FormItem>
                 
                </Card>
            )});
        
        
        return(
                <Card title="家庭成员(最多6条)">
                    <Form layout='inline'>
                    <Card>
                     <FormItem
                     {...formItemLayout}
                        label="姓名"
                        name='name'
                        hasFeedback
                        key='name'>
                        {getFieldDecorator('name', {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules:[{
                                type:'string', pattern:/^[\u4e00-\u9fa5]{1,5}$/, message:'请输入有效的姓名！'
                            },{
                                required:true,message:'请输入有效的姓名！'
                            }]
                        })(
                            <Input placeholder='请输入姓名！'/>
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                        label="关系"
                        name='relationship'
                        hasFeedback
                        key='relationship'>
                        {getFieldDecorator('relationship', {
                            rules:[{
                                required:true, message:'请选择关系！'
                            }],
                            initialValue:'父母'
                        })(
                            <Select>
                                <Option value="male">父母</Option>
                                <Option value="female">兄弟</Option>
                                <Option value="female">姐妹</Option>
                                <option value="other">其他亲属</option>
                        </Select>
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                        label="联系手机"
                        name='mphoneNumber'
                        key='mphoneNumber'
                        hasFeedback>
                        {getFieldDecorator('mphoneNumber', {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                type: 'string', pattern: /^[0-9]{11,13}$/, message: '请输入有效的联系手机！'
                            }, {
                                required: true, message: '请输入有效的联系手机！'
                            }]
                        })(
                            <Input placeholder='请输入联系手机！'/>                        
                    )}
                    </FormItem>
                    </Card>
                        {formItems}
                    </Form>
                    <div>
                        <Button type="primary" size='large' icon="plus-circle-o" onClick={this.add.bind(this)} style={{width:'100%'}}>新增家庭成员</Button>
                    </div>
                </Card>
        )
    }
}

export default Form.create()(FamilyInfo)