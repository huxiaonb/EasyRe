import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import DatePicker from 'antd/lib/date-picker'
 

// import 'antd/lib/style/index.less';
// import 'antd/lib/grid/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/select/style/index.less';
import 'antd/lib/date-picker/style/index.less';


const FormItem = Form.Item;
const Option = Select.Option;
const nations = ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",  
               "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",  
               "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",  
              "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"];  
class PersonalInfo extends React.Component {
    state={
        healthFlag : false
    }
    handleHealthChange(value){
        value==='其他'? this.setState({healthFlag: true}) : this.setState({healthFlag : false});
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let nationOptions = [],
            {healthFlag} = this.state;
        for (let key in nations) {
            nationOptions.push(<Option key={key} value={nations[key]}>{nations[key]}</Option>)
        }
        return(
        <Form layout='vertical'>
            <FormItem
                label="姓名"
                name="name"
                hasFeedback>
                {getFieldDecorator('name', {
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
                label="性别"
                name="gender"
                hasFeedback>
                {getFieldDecorator('gender', {
                    rules:[{
                        required:true, message:'请选择性别！'
                    }],
                    initialValue:'男'
                })(
                    <Select>
                        <Option value="male">男</Option>
                        <Option value="female">女</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
                label="民族"
                name="folk"
                hasFeedback>
                {getFieldDecorator('folk', {
                    rules:[{
                        type:'string', required:true, message:'请选择民族！'
                    }],
                    initialValue : '汉族'
                })(
                    <Select>
                        {nationOptions}
                    </Select>
                )}
            </FormItem>
            
            <FormItem
                label="出生日期"
                name='date-picker'>
                {getFieldDecorator('date-picker', {
                    rules: [{ type:'object', required: true, message: '请选择出生日期!' }]
                })(
                    <DatePicker />
                )}
            </FormItem>
            <FormItem
                label="健康状况"
                name='healthState'>
                {getFieldDecorator('healthState', {
                    rules: [{ type:'string', required: true, message: '请选择健康状况!' }],
                    initialValue : '良好'
                })(
                    <Select
                        onChange={this.handleHealthChange.bind(this)}>
                        <option value="良好">良好</option>
                        <option value="一般">一般</option>
                        <option value="其他">其他</option>
                    </Select>
                    /*{healthFlag && <Input name='healthState' placeholder='请说明健康状况！'/>}*/
                )}
            </FormItem>
            <FormItem
                label="身份证号码"
                name="idCardNumber"
                hasFeedback>
                {getFieldDecorator('idCardNumber', {
                    rules:[{
                        type:'string', pattern:/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, message:'请输入有效的身份证号码！'
                    },{
                        required:true, message:'请输入有效的身份证号码！'
                    }]
                })(
                    <Input placeholder='请输入身份证号码！'/>
                )}
            </FormItem>
            <FormItem
                label="家庭住址"
                name="homeAddress"
                hasFeedback>
                {getFieldDecorator('homeAddress', {
                    rules:[{
                        type:'string', pattern:/^[A-Za-z0-9_\u4e00-\u9fa5]{1,50}$/, message:'请输入有效的家庭住址！'
                    },{
                        required:true,message:'请输入有效的家庭住址！'
                    }]
                })(
                    <Input placeholder='请输入家庭住址！'/>
                )}
            </FormItem>
            <FormItem
                label="现住址"
                name="currentAddress">
                <Input placeholder='请输入现住址！'/>
            </FormItem>
            <FormItem
               label="联系手机"
               name="mobile"
               hasFeedback>
               {getFieldDecorator('mobile', {
                    rules: [{
                        type: 'string', pattern: /^[0-9]{11,13}$/, message: '请输入有效的联系手机！'
                    }, {
                        required: true, message: '请输入有效的联系手机！'
                    }]
                })(
                    <Input placeholder='请输入联系手机！'/>
                )}               
             </FormItem>
             <FormItem
                label="邮箱"
                hasFeedback>
                {getFieldDecorator('email', {
                    rules: [{
                    type: 'email', message: '请输入有效的邮箱!',
                    }, {
                    required: true, message: '请输入有效的邮箱!',
                    }],
                })(
                    <Input placeholder='请输入邮箱!'/>
                )}
            </FormItem>
            <FormItem
                label="联系座机"
                name="tele"
                hasFeedback>
                {getFieldDecorator('tele', {
                    rules: [{
                        type: 'string', pattern: /^([0-9]{3,4}\-)?[0-9]{6,10}(\-[0-9]{1,4})?$/, message: '请输入有效的联系座机！'
                    }]
                })(
                    <Input placeholder='请输入联系座机！'/>
                )}
            </FormItem>
            <FormItem
               label="QQ"
               name="qqNumber"
               hasFeedback>
               {getFieldDecorator('mobile', {
                    rules: [{
                        type: 'string', pattern: /^[0-9]{6,11}$/, message: '请输入有效的QQ！'
                    }]
                })(
                    <Input placeholder='请输入QQ！'/>
                )}               
             </FormItem>
        </Form>
        )}
}

export default Form.create()(PersonalInfo)