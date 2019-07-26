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
} from "../actions/actionTypes";

const initialState = {
    quizes: [], //список тестов
    loading: false,
    error: null,

    quiz: null, //список вопросов в тесте
    activeQuestion: 0, //начинаем с 1 вопроса
    stateAnswer: null, //отмечаем правильный/неправильный ответ [id]: error/[id]: success
    isFinished: false, //пройдена ли викторина
    results: {}, //первый выбор ответов(правильный/неправильный) [id]: error/[id]: success
    rightAnswersQuantity: 0, //количество правильных ответов
    //loading: true,
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true,
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes,
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error,
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz,
            };
        case QUIZ_ANSWER_SET_STATE:
            return {
                ...state, stateAnswer: action.stateAnswer, results: action.results,
            };
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true,
            };
        case QUIZ_ACTIVE_QUESTION:
            return {
                ...state, activeQuestion: action.activeQuestion + 1, stateAnswer: null,
            };
        case RIGHT_ANSWER_QUANTITY:
            return {
                ...state, rightAnswersQuantity: action.rightAnswersQuantity + 1,
            };
        case RETRY_QUIZ:
            return {
                ...state, activeQuestion: 0, stateAnswer: null, isFinished: false, results: {}, rightAnswersQuantity: 0,
            };
        default:
            return state;
    }
}