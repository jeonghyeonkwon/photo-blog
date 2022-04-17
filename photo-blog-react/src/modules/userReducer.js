import {createAction,handleActions} from 'redux-actions'
import {produce} from 'immer'


const USER_CHANGE_FORM = 'user/CHANGE_FORM'
const USER_INITIALIZE = 'user/INITIALIZE'

export const userInitialize = createAction(USER_INITIALIZE)
export const userChangeForm = createAction(USER_CHANGE_FORM,type=>type);

export const initialState = {
  formType:'login',
  loginForm : {
    id:'',
    password:''
  },
  signupForm : {

  }
}
export default handleActions({
  [USER_CHANGE_FORM]:(state, {payload : type} )=>produce(state,draft=>{
    draft.formType = type
  }),
[USER_INITIALIZE]:state=>initialState
},initialState)



