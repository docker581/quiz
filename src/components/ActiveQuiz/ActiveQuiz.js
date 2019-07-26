import React from 'react';

const ActiveQuiz = (props) => { //функция-переменная
    return (
        <section className="section-quiz">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <h3>Ответьте на вопрос</h3>
                        <div className="quiz-container">
                            <div className="signatures clearfix">
                                <span className="question-name float-left">{props.question}</span>
                                <span className="question-number float-right">
                                    {props.questionNumber} из {props.questionLength}</span>
                            </div>
                            <ul className="answer-list">
                                { props.answers.map((answer, index) => {
                                    let name = 'answer-item';
                                    let state = props.state ? props.state[answer.id] : null;
                                    if (state) {
                                        name = name + '-' + state; //получается answer-item-success или answer-item-error
                                    }
                                    return (
                                        <li id={name} key={index}
                                            onClick={() => props.onAnswerClick(answer.id)}>
                                            {answer.text}
                                        </li>
                                    )
                                }) }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ActiveQuiz;