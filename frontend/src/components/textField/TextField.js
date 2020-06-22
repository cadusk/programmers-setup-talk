import { React, MatTextField, Field, ErrorMessage } from "./index";

export default class TextField extends React.Component {
  render() {
    return (
      <div className="text-field">
        <Field
          name={this.props.name}
          type="text"
          as={MatTextField}
          variant="outlined"
          style={{ width: `${this.props.width}` }}
          htmlFor={this.props.name}
          label={this.props.label}
        />
        <span className="error">
          <ErrorMessage name={this.props.name} />
        </span>
      </div>
    );
  }
}
