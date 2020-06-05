import React  from 'react';
import './TopicForm.css'
import { Redirect } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastyUtil } from '../../../utils/toast';
import { TopicRepo } from '../../../repo/topicRepository';

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
        id: props.match.params.id,
        topic: {
          name: '', 
          description: '',
          formErrors: {
            name: '',
            description: ''
           }
        },
        redirect: null,
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.state.id){
      this.getTopic(this.state.id);
    }
  }

  handleStaticFormChange(event) {

    const {name, value}  = event.target;
    
    const topic = this.validateTopicForm(name, value)

    this.setState({topic: topic});
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
    return user;
  }

  validateTopicForm(name, value) {

    let topic = this.state.topic;

    switch(name) {
      case 'name':
        topic.name = value;
        topic.formErrors.name = value.length <= 0 ? 'Tópico é obrigatório': '';
      break;

      case 'description': 
        topic.description = value;
        topic.formErrors.description =  value.length <= 0 ? 'Descrição é obrigatória': ''
      break;

      default: break;
    }
    return topic;
  }

  validateFormErrors (formValues) {
    let valid = true;
    Object.values(formValues).forEach(val => val.length > 0 && (valid = false));
    return valid;
  }

  validateForm(topic) {

    Object.keys(topic).forEach(
      key => {
        this.setState({topic: this.validateTopicForm(key, topic[key])});
      }
    );

    const isValidTopicForm = this.validateFormErrors(this.state.topic.formErrors);

    return isValidTopicForm
  }

   handleSubmit(e) {  
    e.preventDefault();
    let topic = { name: this.state.topic.name, description: this.state.topic.description }
    const isValidTopicForm = this.validateForm(topic);

    if(isValidTopicForm){
      if(this.state.id){
        topic.id = this.state.id
        this.putForm(topic);
      }else {
        this.postForm(topic);
      }
    } else {
      ToastyUtil.errorNotify('Verifique os campos por favor.')
    }
  }

  putForm(data) {

    TopicRepo.edit(data)
      .then(
        res => {
            ToastyUtil.successNotify('Sugestão editada!')
            this.setState({redirect: '/'})  
        }, error => {
          ToastyUtil.errorNotify('Erro ao editar sugestão.');
        }
      );
  }

  postForm(data){

    TopicRepo.add(data)
      .then(
        res => {
            ToastyUtil.successNotify('Sugestão salva!')
            this.setState({redirect: '/'})  
        }, error => {
          ToastyUtil.errorNotify('Erro ao salvar sugestão.');
        }
      );
  }

  getTopic(id) {

    TopicRepo.getById(id)
      .then(
        res => {
          let data = res.data;
          let topic = {
            id: data._id,
            name: data.name,
            description: data.description,
            formErrors: {name: '', description: ''}
          }
          this.setState({topic: topic});
        }, error => {
          ToastyUtil.errorNotify('Erro ao consultar tópico.');
        }
      );
  }

  render(){

    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const topic = this.state.topic;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="form-div">
              <label htmlFor="name">Tópico </label>
              <input
                type="text"
                id="name"
                name="name"
                value={this.state.topic.name}
                onChange={(event) => this.handleStaticFormChange(event)}
              />
              {topic.name.length >= 0 && (
                <span className="error">{topic.formErrors.name}</span>
              )}
              <br></br>
            </div>
            <div className="form-div">
              <label htmlFor="description">Descrição </label>
              <input
                type="text"
                id="description"
                name="description"
                value={this.state.topic.description}
                onChange={(event) => this.handleStaticFormChange(event)}
              />
              {topic.description.length >= 0 && (
                <span className="error">{topic.formErrors.description}</span>
              )}
              <br></br>
            </div>
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

