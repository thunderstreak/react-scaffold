import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            msg: 'Hello World!'
        };
    }*/
    render() {
        return (
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
                <li><Link to="/entry">entry</Link></li>
            </ul>

        );
    }
}
