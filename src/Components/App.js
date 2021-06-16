import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'share-api-polyfill/dist/share-min';
import VideoContainer from "./VideoContainer";
import ImageContainer from "./ImageContainer"

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <VideoContainer />
          </Route>
          {/* <Route exact path="/images">
            <ImageContainer />
          </Route> */}
        </Switch>
    </Router>
  );
}

export default App;
