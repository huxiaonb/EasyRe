import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import Card from 'antd/lib/card'
import Icon from 'antd/lib/icon'
import Badge from 'antd/lib/badge'
import Index from './otherInfo/index'


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
export default class OtherInfo extends React.Component {
    render(){
        return(
            <Index />
        )
    }
}
