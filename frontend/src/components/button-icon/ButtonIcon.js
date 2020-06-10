import React from 'react'
import './ButtonIcon.css'
export default class ButtonIcon extends React.Component {

    render() {

        return (
            <div>
                <button
                  className={`icon ${this.props.className}`}
                  style={{color: this.props.color}}
                  onClick={this.props.onClick}
                >
                  <i className="material-icons">{this.props.iconName}</i>
                </button>
            </div>
        )
    }
}
