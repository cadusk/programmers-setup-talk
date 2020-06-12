import React from 'react'
import './Button.css'


export default class Button extends React.Component {
    render() {
        return (
            <div>
                <button className="btn btn-submit btn-margin-left" onClick={this.props.onClick} type={this.props.type}>
                    {this.props.label}
                </button>
            </div>
        )
    }
}
