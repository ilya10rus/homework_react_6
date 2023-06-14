import style from './app.module.css';
import {useState, useRef, useEffect} from "react";

const initialState = {
    email: '',
    password: '',
    repeatPass: '',
};

const sendData = (formData)=>{
    console.log(formData);
  }

export const Applicaton = ()=> {
  const useStore = () => {
  const [state, setState] = useState(initialState);
  
  return {
      getState: () => state,
      updateState: (fieldName, newValue) => {
          setState({ ...state, [fieldName]: newValue });
      },
  };
}
  const { getState, updateState } = useStore();
  const [errorMessage, setErrorMessage] = useState(null)
    
  const onSubmit = (event)=>{
    event.preventDefault()
    if(email !== '' && password !== '' && repeatPass !== ''){
    sendData(getState())}
  }

  const { email, password, repeatPass } = getState();

  const buttonRef = useRef();
    useEffect(() => {
      if (!errorMessage && repeatPass !== '') {
        buttonRef.current.focus();
      }
    });
  
  const onChange = ({ target }) =>{ 

    updateState(target.name, target.value)

    let newError = null;

        if(target.name === 'email' && target.value <= 0){
          newError = 'Поле обязательно к заполнению'
        }
        if (target.name === 'password' && !/^[\w_]*$/.test(target.value)) {
            newError = 'Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание';
        } else if (target.name === 'password' && target.value.length > 20) {
            newError = 'Неверный пароль. Должно быть не больше 20 символов';
        }
        if(target.name === 'repeatPass' && target.value !== password){
          newError = 'Пароль не совпадает'
          
        }


        setErrorMessage(newError);
  };

  return (
  <div className={style.wrapper}>
    <div className={style.container}>
      
        <form className={style.form} onSubmit={onSubmit}>
       { errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
        <input 
          name='email'
          value={email}
          type='email'
          placeholder='Email...'
          onChange={onChange}
        />
         
         <input
          name='password' 
          value={password}
          type='password'
          placeholder='password...'
          onChange={onChange}
        />
        
        <input 
          name='repeatPass' 
          value={repeatPass}
          type='password'
          placeholder='repeat password please...'
          onChange={onChange}
        />
        <button  
          type = "submit" 
          className={style.btn}
          ref={buttonRef}
          disabled={errorMessage !== null
        }>
          Зарегестрироваться
        </button>
      </form>
    </div>
  </div>
  );
}


