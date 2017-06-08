import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'

import 'antd/lib/style/index.less';
import 'antd/lib/grid/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/select/style/index.less'


const FormItem = Form.Item;

class FamilyInfo extends React.Component {
    render(){
        <div>
            Family Info Section
        </div>
    }
}

export default Form.create()(FamilyInfo)