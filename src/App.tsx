import React from 'react';


import GlobalStyle from './styles/global';
import SiginIn from './pages/SignIn/index';
// import SiginUp from './pages/SingnUp/index';
import {AuthProvider} from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
        <SiginIn/>
    </AuthProvider>
   

    <GlobalStyle />
  </>
);

export default App;
