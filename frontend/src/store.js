import { combineReducers, createStore } from "redux"

const userReducer = (state = [], action) => {
  if (action.type === "login") {
    const loginState = action.loginUser
    return loginState
  }else if (action.type === "logout") {
    const logoutState = {}
    return logoutState
  }else{
    return state
  }
}

const postListreducer = (state = [], action) => {
  if (action.type === "firstSave") {
    return action.new.data
  } else if (action.type === "new"){
    return state
  }
  return state
}
const postDetailReducer = (state= [], action) => {
  if (action.type === "postDetailLoading"){
    const loadPostDetail = action.postDetail
    return loadPostDetail
  }else if (action.type === "postDetailUpdate"){
    const updatePost = action.postUpdate
    return updatePost
  }else{
    return state
  }
}

const commentReducer = (state = [], action) => {
  if (action.type === "dataLoading") {
    const loadData = action.responseData
    return loadData
  }else if (action.type === "add"){
    const copyCommentList = [action.inputComment, ...state]
    return copyCommentList // return된 copyCommentList가 state(기존reducer에 저장된 값)가 된다
  }
  else if (action.type === "delete"){
    let copyCommentList = [...state]
    console.log(copyCommentList)
    copyCommentList.splice(action.i, 1)
    return copyCommentList
  }
  else{
    return state
  }
}
const beerListReducer = (state = [], action) =>{
  if (action.type === "getBeerList") {
    state = action.data
  }
  return state
}

const postCreateReducer = (state = [], action) =>{
  if (action.type==='imgs'){
    state = action.data
  }
  return state
}

const store = createStore( combineReducers( {userReducer, postListreducer, postDetailReducer, commentReducer, beerListReducer, postCreateReducer} ))
export default store;
