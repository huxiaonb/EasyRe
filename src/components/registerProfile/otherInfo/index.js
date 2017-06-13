import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button'
import 'antd/lib/button/style/index.less';

import WorkExp from './work';
import EduExp from './education'

export default class OhterInfo extends React.Component {
    static contextTypes = {
        profile: PropTypes.object,
        updateProfile: PropTypes.func
    }
    
    prevStep(){
        this.props.prev();
    }
    sumitAll(){
        console.log(this);
        let wFlag, eFlag = false;
        let { workF, eduF } = this.refs;
        workF.validateFieldsAndScroll(async (err, values)=>{
             if (!!err) return
             //set value to context 
             //rangetime set config
             wFlag = true;
             let keys = workF.fieldsStore.getFieldValue('keys')
             let workFs = [Object.assign({},{
                 companyName : workF.fieldsStore.getFieldValue('title_'),
                 date : workF.fieldsStore.getFieldValue('rangeTime_'),
                 title : workF.fieldsStore.getFieldValue('position_'),
                 salaryRange : workF.fieldsStore.getFieldValue('salary_'),
             })];
             
             keys.map((key, index) => {
                 let fmObj = Object.assign({},{
                    companyName : workF.fieldsStore.getFieldValue('title_'),
                    date : workF.fieldsStore.getFieldValue('rangeTime_'),
                    title : workF.fieldsStore.getFieldValue('position_'),
                    salaryRange : workF.fieldsStore.getFieldValue('salary_'),
                 });
                 workFs.push(fmObj);
             })
        });
        eduF.validateFieldsAndScroll(async (err, values)=>{
             if (!!err) return
             //set value to context
             //rangetime set config
             eFlag = true
             let keys = workF.fieldsStore.getFieldValue('keys')
             let eduFs = [Object.assign({},{
                 colledgeName : workF.fieldsStore.getFieldValue('title_'),
                 date : workF.fieldsStore.getFieldValue('rangeTime_'),
                 major : workF.fieldsStore.getFieldValue('position_'),
                 isGraduated : workF.fieldsStore.getFieldValue('grad_'),
             })];
             
             keys.map((key, index) => {
                 let fmObj = Object.assign({},{
                    companyName : workF.fieldsStore.getFieldValue('title_'),
                    date : workF.fieldsStore.getFieldValue('rangeTime_'),
                    major : workF.fieldsStore.getFieldValue('position_'),
                    isGraduated : workF.fieldsStore.getFieldValue('grad_'),
                 });
                 eduFs.push(fmObj);
             })
        });
        if(wFlag && eFlag){
            this.props.handleSubmit();
        }
    }
    render(){
        return (
            <div key='exp_cntr'>
                <WorkExp ref='workF' />
                <EduExp ref='eduF' />
                <div style={{textAlign:'center', marginTop:'15px'}}>
                    <Button style={{ marginRight: 8 }} onClick={this.prevStep.bind(this)}>上一步</Button>
                    <Button type="primary" onClick={this.sumitAll.bind(this)}>确认提交</Button>
                </div>
            </div>
        )
    }
}