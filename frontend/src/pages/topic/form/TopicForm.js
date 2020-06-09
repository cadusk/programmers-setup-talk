import React  from 'react';
import './TopicForm.css'
import { Redirect, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastyUtil } from '../../../utils/toast';
import { TopicRepo } from '../../../repo/topicRepository';
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik';

const queryString = require('query-string');

export default class TopicForm extends  React.Component {

  constructor(props){
    super(props);
    let query = queryString.parse(this.props.location.search)
      this.state = {
        user: {
          name: '',
          email: '',
        },
        id: props.match.params.id,
        topic: {
          name: query.name ? query.name : '', 
          description: query.description ? query.description : '',
        },
        redirect: null,
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }


   handleSubmit(values) {  

    let topic =  values

      if(this.state.id){
        topic.id = this.state.id
        this.putForm(topic);
      }else {
        this.postForm(topic);
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


  render(){

    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <Formik
        initialValues={{
          name: this.state.topic.name,
          description: this.state.topic.description,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(1, "Pelo menos 1 caracter")
            .max(20, "Máximo de 20 caracteres")
            .required("Tópico é obrigatório"),

          description: Yup.string()
            .min(1, "Pelo menos 1 caracter")
            .max(255, "Máximo de 255 caracteres")
            .required("Descrição é obrigatória"),
        })}
        onSubmit={(this.values,this.handleSubmit)}
      >
        {({ values, errors, touched,  isSubmitting, isValidating  }) => (
            <Form >
              <div>
                <div className="form-div">

                  <label htmlFor="name">Tópico </label>
                  <Field name="name" type="text"/>
                  <label className="error">
                    <ErrorMessage name="name" className="error" />
                  </label>

                  <label htmlFor="name">Descrição</label>
                  <Field name="description" type="text"/>
                  <span className="error">
                    <ErrorMessage name="description"  />
                  </span>

                </div>
              </div>
              <br></br>
              <div className="submit-button display-buttons margin-div">
                <Link to="/" className="btn btn-link"> Voltar </Link>
                <button
                  disabled={isSubmitting || isValidating}
                  className="btn btn-submit btn-margin-left"
                  type="submit"
                  onSubmit={this.handleSubmit}>
                  Salvar
                </button>
                <br></br>
              </div>
          </Form>
          )}
      </Formik>
    );
  }
}