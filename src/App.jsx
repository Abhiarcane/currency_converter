import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter.jsx";
function App() {
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
