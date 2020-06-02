import React,{Fragment}  from 'react';
import './TopicForm.css'
import { Redirect } from "react-router-dom";
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default class TopicForm extends  React.Component {

constructor(props){
    super(props);
    this.state = {
      user: {
        name: '',
        email: '',
        formErrors: {
          name: '',
          email: ''
        }
      },
      topics: [
           {
             topic: '', 
             description: '',
             formErros: {
               topic: '',
               description: ''
             }
           }
       ],
        redirect: null,
    }

    toast.configure();
    this.handleSubmit = this.handleSubmit.bind(this);
}


 successNotify(message) {
    toast.success(message, this.getNotifyConfigurationObject());
  }

  errorNotify(message) {
    toast.error(message, this.getNotifyConfigurationObject());
  }

  getNotifyConfigurationObject() {
    return {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      };
  }

  handleStaticFormChange(event) {

    const {name, value}  = event.target;
    
    const user = this.validateUserForm(name, value)

    this.setState({user: user});
  }

  validateUserForm(name, value) {

    const EMAIL_REGEX = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    let user = this.state.user;

    switch(name) {
      case 'name':
        user.name = value;
        user.formErrors.name = (value.length < 2) && (value.length > 0) ? 'Mínimo 2 caracteres': '';
      break;

      case 'email': 
        user.email = value;
        user.formErrors.email = !EMAIL_REGEX.test(value) && (value.length <= 0)? 'E-mail inválido\n': ''
      break;

      default: break;
    }
    console.log('user', user);
    return user;
  }

  handleDynamicInputChange(index, event){

    const {name, value}  = event.target;

    let topics = this.validateTopicForm(name, value, index);

    this.setState({topics: topics});

  }

  validateTopicForm(name, value,index) {

    let topic = this.state.topics[index];;

    switch(name) {
      case 'topic':
        topic.topic = value;
        topic.formErros.topic = value.length <= 0 ? 'Tópico é obrigatório': '';
      break;

      case 'description': 
        topic.description = value;
        topic.formErros.description =  value.length <= 0 ? 'Descrição é obrigatória': ''
      break;

      default: break;
    }

    let topics = this.state.topics;
    topics[index] = topic;

    return topics;
  }

  validateFormErrors (formValues) {
    let valid = true;
    Object.values(formValues).forEach(val => val.length > 0 && (valid = false));
    return valid;
  }

   handleSubmit(e) {
    e.preventDefault();
    let isValidTopicForm = true;
    const isValidUserForm = this.validateFormErrors(this.state.user.formErrors);

    this.state.topics.map(topic => {
     if(!this.validateFormErrors(topic.formErros)){
      isValidTopicForm = false;
     }
    });

    if(isValidUserForm && isValidTopicForm){
     this.fetchForm();
    } else {
      this.errorNotify('Verifique os campos por favor.')
    }
  }

  fetchForm() {
    const URL = 'http://localhost:5000/topics';
    const REQUEST = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    };

     fetch(URL,REQUEST).then(
      res => {
        if(res.status === 200) {
          this.successNotify('Sugestões salvas!');
          this.setState({redirect: '/'})
        } 
        else if(res.status === 500) {
          this.errorNotify('Erro ao salvar sugestões!');
        }
      }
    );
  }


  handleAddFields () {
    const values = this.state.topics
    values.push({ topic: '', description: '',formErros: {topic: '', description: ''} })
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
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const user  = this.state.user;
    const topics = this.state.topics;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="form-div">
              <label htmlFor="name">Nome </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form__input"
                value={this.state.user.name}
                onChange={(event) => this.handleStaticFormChange(event)}
              />
              {user.name.length > 0 && (
                <span className="error">{user.formErrors.name}</span>
              )}
              <br></br>
            </div>
            <div className="form-div">
              <label htmlFor="email">E-mail </label>
              <input
                type="text"
                id="email"
                name="email"
                value={this.state.user.email}
                onChange={(event) => this.handleStaticFormChange(event)}
              />
              
              {user.email.length >= 0 && (
                <span className="error">{user.formErrors.email}</span>
              )}
              <br></br>
            </div>
            <h4 className="form-div ">Sugestões</h4>
            {this.state.topics.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <div className="dynamic-fields">
                  <div className="form-div dynamic-div ">
                    <label htmlFor="topic">Tópico</label>
                    <input
                      type="text"
                      id="topic"
                      name="topic"
                      className="input-dynamic"
                      value={inputField.topic}
                      onChange={(event) =>
                        this.handleDynamicInputChange(index, event)
                      }
                    />
                    {topics[index].topic.length >= 0 && (
                      <span className="error">
                        {topics[index].formErros.topic}
                      </span>
                    )}
                    <br></br>
                  </div>
                  <div className="form-div dynamic-div">
                    <label htmlFor="description">Descrição</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="input-dynamic"
                      value={inputField.description}
                      onChange={(event) =>
                        this.handleDynamicInputChange(index, event)
                      }
                    />
                    {topics[index].description.length >= 0 && (
                      <span className="error">
                        {topics[index].formErros.description}
                      </span>
                    )}
                    <br></br>
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
              onSubmit={this.handleSubmit}
            >
              Salvar
            </button>
          </div>
        </form>
      </>
    );
  }
}

