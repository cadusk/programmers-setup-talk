import React from 'react'
import './Button.css'
import { Button as MatButton } from '@material-ui/core';

export default class Button extends React.Component {
    render() {
        return (
            <div>
                <MatButton onClick={this.props.onClick} 
                size={this.props.size}
                type={this.props.type}
                variant={this.props.variant} color={this.props.color}
                href={this.props.href}
                >
                    {this.props.label}
                </MatButton>
            </div>
        )
    }
}
