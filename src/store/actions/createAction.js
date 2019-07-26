import axios from  'axios';
import {
    CREATE_QUIZ_QUESTION,
    RESET_QUIZ_CREATION,
} from "./actionTypes";

export function createQuizQuestion(item) {
    return  {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}
export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('https://react-quiz-1cea3.firebaseio.com/quizes.json', getState().create.quiz); //заносим данные в БД
        dispatch(resetQuizCreation());
    }
}
export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION,
    }
}