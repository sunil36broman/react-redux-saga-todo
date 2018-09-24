import { call, put } from 'redux-saga/effects';
import actions from '../actions/actionTypes';
import API from '../../utils/API';

export function* fetchTodosSaga(action) {
	try {
		const response = yield call(API.fetchTodos);
		const todos = yield response.json();
		yield put({ type: actions.FETCH_TODOS_SUCCEEDED, todos: todos });
	} catch (error) {
		yield put({ type: actions.FETCH_TODOS_FAILED, message: error.message});
	}
}

export function* addNewTodoSaga(action) {
	try {
		console.log(action.todo);
		const response = yield API.addNewTodo(action.todo);
		const todos = yield response.json();
		yield put({ type: actions.ADD_TODO_SUCCEEDED });
		yield put({ type: actions.FETCH_TODOS_SUCCEEDED, todos: todos });
	} catch (error) {
		yield put({ type: actions.ADD_TODO_FAILED, message: error.message });
	}
}

