import React, {Component} from 'react';
import QuestionForm from '../views/QuestionForm';
import $ from 'jquery';
import {Alert, Button} from 'react-bootstrap';

class QuestionContainer extends Component {

  constructor (props) {
    super(props)

    this.state={
      question: null,
      answer: null,
      message: null,
      alertColor: null
    }
  }

componentWillMount = () => {
  this.getQuestions();
}


getQuestions = () => {
  $.ajax({
    url: '/api/questions',
    method: 'GET'
  }).done((question) => {
    this.setState({question});
    console.log(question);
  })
}

  onChangeHandler = (value) => {
    console.log(value);
    if(value) {
      this.setState({answer: value})
  }
}

  onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(typeof(this.state.answer));
    if (this.state.answer === 'false') {
      this.setState({alertColor: 'alert alert-danger'})
      this.setState({message: 'false...'});
    } else if (this.state.answer === 'true') {
      this.setState({alertColor: 'alert alert-succes'})
      this.setState({message:'correct'});
    }
  }


  render () {
    return (
      <div>
        {this.state.message? <Alert className={this.state.alertColor}>{this.state.message}<Button bsStyle='primary'></Button></Alert> : null}
        {this.state.question && this.props.game ? <QuestionForm onChangeHandler={this.onChangeHandler} question={this.state.question} game={this.props.game} onSubmitHandler={this.onSubmitHandler}/> : null}
      </div>
    )
  }

}

export default QuestionContainer;
