import { useEffect, useState } from "react";


const useCurrency = async() =>{
  try{
    const res = await fetch("https://api.frankfurter.app/currencies");
    const data = await (res.json)
    console.log(data)
    // setCurrencies(data);
  }catch(error){
    console.error("Fetching error", error);
  }
    // const [data, setData] = useState({});
    // useEffect(() => {
    //   fetch(`
    //   https://api.frankfurter.app/currencies`)
    //   .then((res) => res.json())


    // }, [])
    // console.log(data)
    // return data

};


export default useCurrency