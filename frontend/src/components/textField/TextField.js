import React from 'react'
import './TextField.css'
import { Field, ErrorMessage } from "formik";


export default class TextField extends React.Component {
    render() {
        return (
            <div>
                <label htmlFor={this.props.name} >{this.props.label}</label>
                <Field name={this.props.name} type="text" />
                <span className="error">
                  <ErrorMessage name={this.props.name} />
                </span>
            </div>
        )
    }
}
