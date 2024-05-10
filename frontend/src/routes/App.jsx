import Graphics from '../components/Graphics';
import EmbeddedPage from "../components/iframe";

function App() {
  return (
    <>
    <div className="app">
      <div className="container">
      <EmbeddedPage/>
      <Graphics />
      </div>
    </div>
    </>
  );
}

export default App;
