import React from 'react'

const Dropdown =({
  currencies,
  currency,
  setCurrency,
  title =""
}) =>{
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      <div className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none '>
        <select value ={currency} onChange={(e)=>setCurrency(e.target.value)}>
          {currencies?.map((currency)=>{
            return(
              <option value ={currency} key ={currency}>{currency}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
 
}
export default Dropdown;