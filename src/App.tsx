import { Container, Grid } from '@material-ui/core';
import Sidebar from './componentes/leftSidebar/Sidebar';
import { General } from './componentes/main';
import { CrearComentario } from './componentes/main/CrearComentario';
import SignIn from './componentes/sign-in/SignIn'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Route path="/" exact>
            <Grid container>
              <Grid item xs={3}>
                <Sidebar>

                </Sidebar>
              </Grid>
              <Grid item xs={6}>
                <CrearComentario />
                <General></General>
              </Grid>
              <Grid item xs={3}>
                <Sidebar>

                </Sidebar>
              </Grid>
            </Grid>
          </Route>
          <Route path="/login">
            <SignIn></SignIn>
          </Route>
        </Router>
      </Container>
    </div>
  );
}

export default App;
