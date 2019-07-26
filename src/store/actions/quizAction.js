import axios from  'axios';
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    QUIZ_ANSWER_SET_STATE,
    FINISH_QUIZ,
    QUIZ_ACTIVE_QUESTION,
    RIGHT_ANSWER_QUANTITY,
    RETRY_QUIZ,
} from "./actionTypes";

export function fetchQuizes() {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get('https://react-quiz-1cea3.firebaseio.com/quizes.json'); //получаем данные
            //console.log('RESPONSE_DATA', response.data);
            const quizes = []; //для тестов
            const titles =[]; //для заголовков
            for (let key in response.data) {
                titles.push(response.data[key][response.data[key].length - 1].title); //сохраняем для каждого вопроса
                                                                        //его последний сохраненный заголовок
            }
            Object.keys(response.data).forEach((key, index) => { //пробегаемся по ключам объекта данных сервера
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`,
                    title: titles[index],
                })
            });
            dispatch(fetchQuizesSuccess(quizes));
        } catch(e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get(`https://react-quiz-1cea3.firebaseio.com/quizes/${quizId}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes,
    }
}
export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e,
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz: quiz,
    }
}
export function quizAnswerClick(answerId) {
    return (dispatch, getState) => { //getState - для получения данных из state
        const state = getState().quiz;
        if (state.stateAnswer) { //если дан ответ
            const key = Object.keys(state.stateAnswer)[0]; //вытаскиваем свойство объекта (нужный id) текущего вопроса
            if (state.stateAnswer[key] === 'success') {
                return   //запрещаем другие клики, если есть правильный ответ
            }
        }
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (answerId === question.rightAnswerId) {
            if (!results[state.activeQuestion]) { //проверка на первое попадание
                results[state.activeQuestion] = 'success'; //дан правильный ответ
                // this.setState({
                //     rightAnswersQuantity : this.state.rightAnswersQuantity + 1,
                // });
                dispatch(rightAnswersQuantity(state.rightAnswersQuantity));
            }
            dispatch(quizAnswerSetState({[answerId] : 'success'}, results));
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) { //проверка, если ли еще вопросы
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizActiveQuestion(state.activeQuestion))
                }
                window.clearTimeout(timeout); //отменяем задержку
            }, 200);
        } else {
            results[state.activeQuestion] = 'error'; //дан неправильный ответ
            dispatch(quizAnswerSetState({[answerId] : 'error'}, results));
        }
    }
}
function isQuizFinished(state){ //проверяем, закончились ли вопросы
    return state.activeQuestion + 1 === state.quiz.length; //возвращает булево значение
}
export function retryQuiz() {
    return {
        type: RETRY_QUIZ,
    }
}
export function quizAnswerSetState(stateAnswer, results) {
    return {
        type: QUIZ_ANSWER_SET_STATE,
        stateAnswer: stateAnswer,
        results: results,
    }
}
export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    }
}
export function quizActiveQuestion(activeQuestion) {
    return {
        type: QUIZ_ACTIVE_QUESTION,
        activeQuestion: activeQuestion,
    }
}
export function rightAnswersQuantity(rightAnswersQuantity) {
    return {
        type: RIGHT_ANSWER_QUANTITY,
        rightAnswersQuantity: rightAnswersQuantity,
    }
}
