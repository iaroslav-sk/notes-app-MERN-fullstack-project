import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReduser,
  userRegisterReduser,
  userUpdateReduser,
} from "./redusers/userRedusers";
import {
  noteCreateReduser,
  noteDeleteReduser,
  noteListReduser,
  noteUpdateReduser,
} from "./redusers/notesReduser";

const reduser = combineReducers({
  userLogin: userLoginReduser,
  userRegister: userRegisterReduser,
  noteList: noteListReduser,
  noteCreate: noteCreateReduser,
  noteUpdate: noteUpdateReduser,
  noteDelete: noteDeleteReduser,
  userUpdate: userUpdateReduser,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middelware = [thunk];

const store = createStore(
  reduser,
  initialState,
  composeWithDevTools(applyMiddleware(...middelware))
);

export default store;
