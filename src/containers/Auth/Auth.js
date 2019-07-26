import React, {Component} from 'react';
import {connect} from "react-redux";
import {auth} from "../../store/actions/authAction";

class Auth extends Component {
    state = {
        formControls: {
            email: {
                value: '',
            },
            password: {
                value: '',
            },
        },
    };
    authHandler = () => { //авторизация
        //console.log('AUTH_TEST', this.state.formControls.email.value, this.state.formControls.password.value);
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value,);
    };
    submitHandler = (event) => {
        event.preventDefault(); //отменяем стандартное поведение формы
    };
    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}; //получаем копию списка контролов формы state,
        // ... - spread-выражение!
        const control = {...formControls[controlName]}; //получаем копию нужного контрола формы
        control.value = event.target.value; //записываем введеные данные в свойство копии контрола формы
        formControls[controlName] = control; //заменяем контрол формы его изменившейся копией
        this.setState({
            formControls: formControls, //заменяем список контролов формы state его копией с замененным контролером
        });
    };
    render() {
        return (
            <section className="section-auth">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <h3 className="mb-4">Войдите в систему</h3>
                            {this.props.noEnter
                                ?  <h4 className="mb-3">Вход не выполнен!</h4>
                                : null
                            }
                            <form onClick={this.submitHandler}>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">E-mail:</label>
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control" id="inputEmail3"
                                               onChange={(event) => this.onChangeHandler(event, 'email')}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Пароль</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" id="inputPassword3"
                                               autoComplete="password" onChange={(event) => this.onChangeHandler(event, 'password')}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 clearfix">
                                        <button type="submit" className="btn btn-secondary float-right"
                                                onClick={this.authHandler}>Войти
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
function mapStateToProps(state) { //проверка на авторизацию
    return {
        noEnter: !!state.auth.noEnter,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password) => dispatch(auth(email, password)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);