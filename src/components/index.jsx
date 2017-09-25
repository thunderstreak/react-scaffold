import React from 'react';

import Entry from './entry';
import About from './About';
import Home from './home';
import Join from './Join';


export default class Index extends React.Component {
    render() {
        return (
            <div className="Index">
               {this.props.children || <Entry/>}
            </div>
        );
    }
}
