import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Field, ErrorMessage } from "formik";
import "./Textarea.css"
export default class Textarea extends React.Component {
  render() {
    return (
      <div className="textarea"> 
        <Field
          name={this.props.name}
          rowsMin={3}
          as={TextareaAutosize}
          style={{ width: `${this.props.width}` }}
          placeholder={this.props.label}
        />
        <span className="error">
          <ErrorMessage name={this.props.name} />
        </span>
      </div>
    );
  }
}