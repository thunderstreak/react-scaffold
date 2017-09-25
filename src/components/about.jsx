import React from 'react';

export default class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg:'abouts'
        }
    }
    render(){
        return(
            <div>
                <h2>{this.state.msg}</h2>
            </div>
        )
    }
}