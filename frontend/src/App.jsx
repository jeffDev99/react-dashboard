import { useRoutes } from "react-router-dom";
import routes from "./router/Router";
function App() {
  let router = useRoutes(routes);
  return router;
}

export default App;
