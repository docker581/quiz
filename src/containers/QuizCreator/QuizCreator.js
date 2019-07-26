import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/createAction";
import CreateFormInput from "../../components/CreateFormInput/CreateFormInput";

function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        value: '',
    }
}
function validateInput(value, validation = null) {
    if (!validation) {
        return true;
    }
    let isValid = true;
    if (validation.required) { //валидируем на обязательность заполнения
        isValid = value.trim() !== '' && isValid;
    }
    return isValid;
}
function validateForm(formControls) {
    let isFormValid = true;
    // Object.keys(formControls).forEach((name) => {
    //     isFormValid = formControls[name].valid && isFormValid; //если все контролы валидны, сама форма валидна
    // });
    for (let control in formControls) { //альтернативный код
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }
    return isFormValid;
}
function createOptionControl(number) { //создаем options
    return createControl({
        label: `Ответ №${number}:`, //используем `` (обратные) кавычки для использования параметра функции в строке
        errorMessage: 'Поле не может быть пустым!',
        id: number,
        type: 'text',
    }, {required: true})
}
function createFormControls() { //создаем контролы формы
    return {
        title: createControl({
            label: 'Тема',
            errorMessage: 'Поле не может быть пустым!',
            type: 'text',
        }, {required: true}),
        question: createControl({
            label: 'Вопрос:',
            errorMessage: 'Поле не может быть пустым!',
            type: 'text',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}
class QuizCreator extends Component {
    state = {
        formControls: createFormControls(),
        rightAnswerId: 1, //если null - будет предупреждение
        isFormValid: false,
    };
    submitHandler = (event) => {
        event.preventDefault();
    };
    addQuestionHandler = (event) => {
        event.preventDefault();
        const {title, question, option1, option2, option3, option4} = this.state.formControls; //деструктуризация объекта
        //и избавление от громоздкого кода
        const questionItem = { //вопрос (с вариантами ответов, 1 из которых правильный)
            title: title.value,
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };
        this.props.createQuizQuestion(questionItem);
        let formControls = createFormControls();
        formControls.title.value = questionItem.title;
        formControls.title.valid = true;
        //console.log('FORM_CONTROLS', formControls);
        this.setState({ //обнуляем state, кроме названия теста
            formControls: formControls,
            rightAnswerId: 1,
            isFormValid: false,
        })
    };
    createQuizHandler = (event) => {
        event.preventDefault();
        this.setState({ //обнуляем state
            formControls: createFormControls(),
            rightAnswerId: '',
            isFormValid: false,
        });
        this.props.finishCreateQuiz();
    };
    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.touched = true;
        control.value = event.target.value;
        control.valid = validateInput(control.value, control.validation);
        formControls[controlName] = control;
        this.setState({
            formControls: formControls, //заменяем список контролов формы state его копией с замененным контролером
            isFormValid: validateForm(formControls), //заменяем переменную валидности формы
        });
    };
    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <React.Fragment
                    key={index}  //!
                >
                    <CreateFormInput
                        type={control.type}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(event) => this.onChangeHandler(event, controlName)}
                    />
                    {
                        index === 0 || index === 5 ? <hr/> : null //добавляем вертикальную черту после первого и последнего элемента
                    }
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value, //приводим значение option к целому числу (очень важно!)
        })
    };
    renderOptions = (options) => {
        return(
            options.map((option, index) => {
                return (
                    <option
                        key = {index} //!
                        value={option.value}
                    >
                        {option.text}
                    </option>
                )
            })
        )
    };
    render() {
        let options = [
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4},
        ];
        return (
            <section className="section-create">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <h3 className="mb-4">Создание теста</h3>
                            <form onSubmit={this.submitHandler}>
                                {this.renderInputs()}
                                <div className="form-group row mb-5">
                                    <label htmlFor="select" className="col-sm-3 col-form-label">Правильный
                                        ответ</label>
                                    <div className="col-sm-9">
                                        <select
                                            className="custom-select"
                                            value={this.state.rightAnswerId}
                                            onChange={this.selectChangeHandler}
                                        >
                                            {this.renderOptions(options)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row clearfix form-buttons">
                                    <div className="col-6">
                                        <button type="button" className="btn btn-warning float-left"
                                                onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}>
                                            Добавить вопрос
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" className="btn btn-secondary float-right"
                                                onClick={this.createQuizHandler} disabled={this.props.quiz.length === 0}>
                                            Создать тест
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
function mapStateToProps(state) {
    return {
        quiz: state.create.quiz,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);