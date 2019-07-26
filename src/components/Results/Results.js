import React from 'react';
import {Link} from "react-router-dom";

const Results = (props) => {
    return (
        <section className="section-result">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <h3>Вы прошли тест!</h3>
                        <div className="quiz-container">
                            <h4><b>Результаты:</b></h4>
                            <ul className="result-list">
                                {props.quiz.map((quizItem, index) => {
                                    return(
                                        <li
                                            key = {index} //!
                                        >
                                            {quizItem.question} - {props.results[index] === 'success'
                                            ? <i className="fas fa-check" style={{color: 'green'}}/>
                                            : <i className="fas fa-times" style={{color: 'red'}}/>
                                        }
                                        </li>
                                    )
                                })}
                            </ul>
                            <h4 className="mb-5"><b>Правильно:</b> {props.quantity} из {props.quiz.length}</h4>
                            <div className="form-group row clearfix form-buttons">
                                <div className="col-6">
                                    <button type="button" className="btn btn-warning float-left"
                                            onClick={props.onRetry}>Пройти еще раз
                                    </button>
                                </div>
                                <div className="col-6">
                                    <Link to="/">
                                        <button
                                            className="btn btn-secondary float-right"
                                        >К списку тестов</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default Results;