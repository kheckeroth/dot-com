// src/App.js
import './App.css';
import Gallery from './components/gallery';
import About from './components/about';
import Contact from './components/contact';

function App() {
  return (
    <div className="App">
      <header>
        <h1>My Art Portfolio</h1>
      </header>
      <main>
        <Gallery />
        <hr />
        <About />
        <hr />
        <Contact />
      </main>
    </div>
  );
}

export default App;