import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import Results from '../../components/Results/Results';
import Loader from "../../components/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quizAction';

class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }
    componentWillUnmount() { //обнуление state при переходе на другую страницу
        this.props.retryQuiz();
    }
    render() {
        return (
            <div className="quiz">
                {this.props.loading || !this.props.quiz
                    ? <Loader/>
                    : this.props.isFinished //проверяем, пройден ли тест
                        ? <Results
                            results={this.props.results} //объект с результатами вопросов
                            quiz={this.props.quiz} //массив вопросов
                            quantity={this.props.rightAnswersQuantity} //количество правильных ответов
                            onRetry={this.props.retryQuiz} //повторить попытку
                        />
                        : <ActiveQuiz
                            answers={this.props.quiz[this.props.activeQuestion].answers} //передаем ответы
                            question={this.props.quiz[this.props.activeQuestion].question} //передаем текущий вопрос
                            questionLength={this.props.quiz.length} //количество вопросов
                            questionNumber={this.props.activeQuestion + 1} //номер вопроса
                            state={this.props.stateAnswer} //состояние ответа
                            onAnswerClick={this.props.quizAnswerClick} //обработка нажатия ответа
                        />
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        quiz: state.quiz.quiz,
        activeQuestion: state.quiz.activeQuestion,
        stateAnswer: state.quiz.stateAnswer,
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        rightAnswersQuantity: state.quiz.rightAnswersQuantity,
        loading: state.quiz.loading,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
