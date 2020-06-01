import React,{Fragment}  from 'react';
import './TopicForm.css'
export default class TopicForm extends  React.Component {

constructor(props){
    super(props);
    this.state = {  
        name: '',
        email: '',
        topics: [
            {theme: '', description: ''}
        ]
    }

    this.handleSubmit = this.handleSubmit.bind(this);

}

   handleSubmit(e){
    e.preventDefault();
  }

  handleDynamicInputChange(index, event){
    const values = this.state.topics;
    if (event.target.name === "theme") {
      values[index].theme = event.target.value;
    } else {
      values[index].description = event.target.value;
    }


    this.setState({topics: values});
  }

handleInputChange(event){
      let value = {name: '', description: '', topics: []};
    if (event.target.name === "name") {
      value.name = event.target.value;
    } else {
      value.description = event.target.value;
    }

    value.topics = this.state.topics;

    
  }

handleAddFields () {
    const values = this.state.topics
    values.push({ theme: '', description: '' })
    this.setState({topics: values})
  }

   handleRemoveFields (index) {
    const values = this.state.topics
    if(values.length > 1 ){
      values.splice(index, 1);
      this.setState({topics: values});
    }
  }

  render(){
  return (
    <>
    <form onSubmit={this.handleSubmit}>
      <div>
          <div className="form-div">
          <label  htmlFor="name">Nome </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form__input"
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value})}
               />
          </div>
          <div className="form-div">
          <label htmlFor="email">E-mail </label>
              <input
                type="text"
                id="email"
                name="email"
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}
               />
          </div>
          <h4 className="form-div ">Sugestões</h4>
        {this.state.topics.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <div className="dynamic-fields">
            <div className="form-div dynamic-div ">
              <label htmlFor="theme">Tema</label>
              <input
                type="text"
                id="theme"
                name="theme"
                className="input-dynamic"
                value={inputField.theme}
                onChange={event => this.handleDynamicInputChange(index, event)}
              />
            </div>
            <div className="form-div dynamic-div">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                id="description"
                name="description"
                className="input-dynamic" 
                value={inputField.description}
                onChange={event => this.handleDynamicInputChange(index, event)}
              />
            </div>
            <div className="form-div display-buttons ">
              <button
                className="btn-dynamic"
                type="button"
                onClick={() => this.handleRemoveFields(index)}
              >
                -
              </button>
              <button
                className="btn-dynamic"
                type="button"
                onClick={() => this.handleAddFields()}
              >
                +
              </button>
            </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="submit-button margin-div">
        <button
          className="btn btn-submit"
          type="submit"
          onSubmit={this.handleSubmit}>
          Salvar
        </button>
      </div>
    </form>
  </>
  );
}
}

