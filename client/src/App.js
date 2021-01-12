import './App.css';
import {Aside, Dialog, Login, Sender} from "./components";

function App() {
  return (
      <div className='wrapper'>
        <Aside />
        <main className="main">
            <Dialog/>
            <Sender/>
        </main>
          {/*<Login/>*/}
      </div>
  );
}

export default App;
