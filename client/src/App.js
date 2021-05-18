import { BrowserRouter, Switch, Route } from 'react-router-dom';

import '../src/style/app.sass';

// import pages 
import Home from './pages/Home'


function App() {
  return (
    <BrowserRouter>

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        {/* <Route>
          <Erreur404 />
        </Route> */}


      </Switch>
    </BrowserRouter>
  );
}

export default App;
