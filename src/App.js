import './App.css';
import {Provider} from 'react-redux'
import store from './redux/store'
import ToDoContainer from './components/ToDoContainer'
import React,{useEffect} from 'react'
import { Notifications } from 'react-push-notification';



function App() {

  return (
    <Provider store={store}>
      <div>
      <Notifications></Notifications>
      <ToDoContainer></ToDoContainer>
        {/* <CakeContainer></CakeContainer>
        <HooksCakeContainer></HooksCakeContainer>
        <IceCreamContainer></IceCreamContainer> */}
      </div>
    </Provider>
    
  );
}

export default App;
