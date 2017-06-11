import React from 'react';
import ReactDOM from 'react-dom';

import WorkExp from './work';
import EduExp from './education'

export default class Index extends React.Component {
    render(){
        return (
            <div key='exp_cntr'>
                <WorkExp />
                <EduExp />
            </div>
        )
    }
}