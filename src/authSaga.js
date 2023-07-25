

import { put, takeLatest, call } from "redux-saga/effects";
import { LOGIN_REQUEST, loginSuccess, loginFailure } from "./authActions";
import { authenticateUser } from "./api";

function* loginSaga(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(authenticateUser, username, password);

    yield put(loginSuccess(response.user)); // Dispatch LOGIN_SUCCESS on success
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export default authSaga;
