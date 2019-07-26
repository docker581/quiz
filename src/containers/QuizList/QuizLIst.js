import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizes} from '../../store/actions/quizAction'

class QuizList extends Component {
    renderQuizes = () => {
        console.log('QUIZLIST', this.props.quizes);
        return this.props.quizes.map((quiz) => {
            return (
                <NavLink
                    to={'/quiz/' + quiz.id}
                    key={quiz.id} //!
                >
                    <li>{quiz.name}. {quiz.title}</li>
                </NavLink>
            )
        })
    };
    componentDidMount() { //используется для работы с бэкендом (когда отрисовалось DOM-дерево)
        this.props.fetchQuizes();
    }
    render() {
        return (
            <section className="section-list">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <h3>Доступные тесты</h3>
                            {this.props.loading && this.props.quizes.length !== 0
                                ? <Loader/>
                                : <ul className="quiz-list">
                                    {this.renderQuizes()}
                                </ul>

                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
