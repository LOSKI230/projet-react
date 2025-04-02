
import './App.css'
import ApiRecherche from './rechercheapi'
import Navbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';



  function App() {
    return (
      <div className="p-4">
        <Navbar />
        <ApiRecherche />
      </div>
    );
  }
  
  export default App;
