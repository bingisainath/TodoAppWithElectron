import * as api from "../../api/auth";

export const loginUser = (formdata) => (dispatch) => {
  console.log("called login user");
  dispatch({ type: "AUTH_LOGIN_INIT" });
  return api
    .login(formdata)
    .then((_) => dispatch({ type: "AUTH_LOGIN_SUCCESS" }))
    .catch((error) => dispatch({ type: "AUTH_LOGIN_ERROR", error }));
};
