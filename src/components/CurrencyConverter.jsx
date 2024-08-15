import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";
const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  //api.frankfurter.app/currencies
  //api.frankfurter.app/latest?amount=1&from=USD&to=INR

  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]);
      setConverting(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFavorite = (currency) => {};

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);
  console.log(currencies);

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-blue-500 rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-black">
        Currency converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <DropDown
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrency}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft />
          </button>
        </div>
        <DropDown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorite={handleFavorite}
          title="To:"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>
      <div className=" flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-amber-500 text-black font-semibold rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting ? "animate-pulse" : ""
          }`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-black">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
