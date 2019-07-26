import React, {Component} from 'react';
import './App.css';
import logo2 from './smiley2.png';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'; //функции маршрутизации
import Header from './components/Header/Header'; //шапка сайта
//import QuizCreator from './containers/QuizCreator/QuizCreator';
import {connect} from "react-redux"; //связь с хранилищем
import Logout from './components/Logout/Logout'; //выход из системы
import Auth from "./containers/Auth/Auth"; //авторизация
import {autoLogin} from "./store/actions/authAction"; //экшены авторизации
import QuizLIst from "./containers/QuizList/QuizLIst"; //список тестов
import Quiz from "./containers/Quiz/Quiz"; //детальная страница теста
import QuizCreator from "./containers/QuizCreator/QuizCreator"; //создание теста

class App extends Component {
    componentDidMount() {
        this.props.autoLogin();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/" exact component={QuizLIst}/>
                <Redirect to='/'/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/quiz-creator" component={QuizCreator}/>
                    <Route path="/quiz/:id" component={Quiz}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={QuizLIst}/>
                    <Redirect to='/'/>
                </Switch>
            );
        }
        return (
            <React.Fragment>
                <Header
                    isAuthenticated={this.props.isAuthenticated}
                />
                <main>
                    {routes}
                </main>
                <footer>
                    <div className="container d-flex">
                        <div className="copyrights d-flex align-items-center mr-auto">
                            Denis Doktorov {new Date().getFullYear()}
                        </div>
                        <div className="navbar-brand ml-auto">
                            <img src={logo2} alt=""/>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) { //проверка на авторизацию
    return {
        isAuthenticated: !!state.auth.token, //если токен есть, пользователь авторизован
    }
}
function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin()),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)); //оборачиваем App в Router

