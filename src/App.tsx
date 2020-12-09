import { Container, Grid } from '@material-ui/core';
import Sidebar from './componentes/leftSidebar/Sidebar';
import { General } from './componentes/main';
import { CrearComentario } from './componentes/main/CrearComentario';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Container>
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
      </Container>
    </div>
  );
}

export default App;
