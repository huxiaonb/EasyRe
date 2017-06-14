import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button'
import PropTypes from 'prop-types';

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
        if(this.context.info.otherInfo.workExps.length && this.context.info.otherInfo.edus.length){
            this.props.handleSubmit();
        }  
    }
    saveForTempory(){
        let wFlag, eFlag = false;
        let { workF, eduF } = this.refs;
        let workFs,eduFs = [];
        workF.validateFieldsAndScroll(async (err, values)=>{
             if (!!err) return
             //set value to context 
             //rangetime set config
             wFlag = true;
             let keys = workF.fieldsStore.getFieldValue('keys')
             workFs = [Object.assign({},{
                 companyName : workF.fieldsStore.getFieldValue('title'),
                 date : workF.fieldsStore.getFieldValue('rangeTime'),
                 title : workF.fieldsStore.getFieldValue('position'),
                 salaryRange : workF.fieldsStore.getFieldValue('salary'),
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
             let keys = eduF.fieldsStore.getFieldValue('keys')
             eduFs = [Object.assign({},{
                 colledgeName : eduF.fieldsStore.getFieldValue('title'),
                 date : eduF.fieldsStore.getFieldValue('rangeTime'),
                 major : eduF.fieldsStore.getFieldValue('position'),
                 isGraduated : eduF.fieldsStore.getFieldValue('grad'),
             })];
             
             keys.map((key, index) => {
                 let fmObj = Object.assign({},{
                    colledgeName : eduF.fieldsStore.getFieldValue('title_'),
                    date : eduF.fieldsStore.getFieldValue('rangeTime_'),
                    major : eduF.fieldsStore.getFieldValue('position_'),
                    isGraduated : eduF.fieldsStore.getFieldValue('grad_'),
                 });
                 eduFs.push(fmObj);
             })
        });
        if(wFlag && eFlag){
            this.context.updateProfile({otherInfo:{workExps:workFs,edus:eduFs},flag:3});
        }
    }
    /*componentDidMount(){
        
        let { workF, eduF } = this.refs;
        if(workExps.length){
            workExps.map((wk,idx)=>{
                if(idx){
                    workF.setFieldsValue({
                        ['companyName_' + idx] : wk.companyName,
                        ['date_' + idx] : wk.date,
                        ['title_' + idx] : wk.title,
                        ['salaryRange_' + idx] : wk.salaryRange
                    })  
                }else{
                    workF.setFieldsValue({
                        companyName : wk.companyName,
                        date : wk.date,
                        title : wk.title,
                        salaryRange : wk.salaryRange
                    })
                }
            });
        }
        if(edus.length){
            edus.map((wk,idx)=>{
            if(idx){
                eduF.setFieldsValue({
                    ['colledgeName_' + idx] : wk.colledgeName,
                    ['date_' + idx] : wk.date,
                    ['major_' + idx] : wk.majors,
                    ['isGraduated_' + idx] : wk.isGraduated
                })  
            }else{
                eduF.setFieldsValue({
                    colledgeName : wk.colledgeName,
                    date : wk.date,
                    major : wk.major,
                    isGraduated : wk.isGraduated
                })
            }
            })
        }
        
        
    }*/
    render(){
        let { workExps,edus } = this.context.profile.otherInfo;
        return (
            <div key='exp_cntr'>
                <WorkExp workExps={workExps} ref='workF' />
                <EduExp edus={edus} ref='eduF' />
                <div style={{textAlign:'center', marginTop:'15px'}}>
                    <Button style={{ marginRight: 8 }} onClick={this.prevStep.bind(this)}>上一步</Button>
                    <Button type="primary" style={{ marginRight: 8 }} onClick={this.saveForTempory.bind(this)}>暂存</Button>
                    <Button type="primary" onClick={this.sumitAll.bind(this)}>确认提交</Button>
                </div>
            </div>
        )
    }
}