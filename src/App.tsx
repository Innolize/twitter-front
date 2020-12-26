import { Container, Grid } from '@material-ui/core';
import { Sidebar } from './componentes/leftSidebar/Sidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MainPage } from './screens/MainPage';
import { LogIn } from './screens/LogIn';
import { CreateAccount } from './screens/CreateAccount';

function App() {
  return (
    <div className="App">
      <Container >
        <Router>
          <Route path="/login" exact>
            <LogIn />
          </Route>
          <Route path="/create-account" exact>
            <CreateAccount />
          </Route>
          <Route path="/main" >
            <MainPage />
          </Route>
        </Router>
      </Container>
    </div>
  );
}

export default App;
