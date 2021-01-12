import './App.css';
import { AppRouter } from './router/router';
import { useGlobalContext } from './context';
import { useEffect } from 'react';

function App() {
  const { setUserInfo } = useGlobalContext();
  useEffect( () => {
    if(localStorage.getItem('userInfo')) {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, [])
  
  // if (!isLoggedIn) {
  //   return (
  //     <div >
  //       <Login />
  //     </div>
  //   );
  // }


  return (
    <>
      <AppRouter />
    </>
  )

}

export default App;
