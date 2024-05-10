import {useEffect} from "react";
import {useState} from "react";
import  Dropdown from "./Dropdown"
import {HiArrowsRightLeft} from "react-icons/hi2";


const currencyConverter = () =>{
  const[currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [toCurrency, setToCurrency] = useState("CAD");
  const [fromCurrency,setFromCurrency] =useState("USD");
  const [convertedAmount, setConvertedAmount] =useState(null)
  const [converting, setConverting] =useState(false)


  const getCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  console.log(currencies);
  const convertCurrency= async ()=>{
    if(!amount) return;
    setConverting(true)
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
    }finally {
      setConverting(false)
    }
  };
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return(
    <div className="max-w-xl mx-auto my-10 p-10 bg-sky-200 rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-bold text-black text-center "> Currency Converter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <Dropdown currencies ={currencies} title ="From" currency={fromCurrency} setCurrency={setFromCurrency}/>
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <Dropdown currencies ={currencies} title ="To" currency={toCurrency} setCurrency={setToCurrency}/>

      </div>
      <div className="mt-4">
        <label htmlFor="amount"
        className="block text-sm font-medium text-gray-700">Amount:</label>
        <input type ="number" value={amount}
        onChange={(e)=>setAmount(e.target.value)}
         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"/>
      </div>
        <div className="flex justify-end mt-6">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" onClick={convertCurrency}>Convert</button>

        </div>
        {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
      
    </div>
  )
}
export default currencyConverter
