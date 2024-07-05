import './App.css';
import { useState } from 'react';
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setWeeklyIncome([...weeklyIncome, data.weeklyIncome])
    setWeeklyMiscellaneous([...weeklyMiscellaneous, data.miscellaneous])
    setGrossIncome(grossIncome + Number(data.weeklyIncome));
    setNetIncome(netIncome + Number(data.weeklyIncome - data.miscellaneous))
    setButtonClicked(false);
    setWeekNumber(weekNumber + 1);
    setWeekStart([...weekStart, data.weekStart]);
    setWeekEnd([...weekEnd, data.weekEnd]);
    if(weekNumber === 3) {
      setMonthNumber(monthNumber + 1);
      setWeekNumber(0);
      setNetIncome(netIncome + Number(data.weeklyIncome - data.miscellaneous - data.internetCost - data.electricityCost))
    }
  } 
  const [weeklyIncome, setWeeklyIncome] = useState([])
  const [weeklyMiscellaneous, setWeeklyMiscellaneous] = useState([])
  const [weekStart, setWeekStart] = useState([])
  const [weekEnd, setWeekEnd] = useState([])
  const [weekNumber, setWeekNumber] = useState(0);
  const [monthNumber, setMonthNumber] = useState(0);
  const [grossIncome, setGrossIncome] = useState(0);
  const [netIncome, setNetIncome] = useState(0);     
  const [buttonClicked, setButtonClicked] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [nextPageDisabled, setNextPageDisabled] = useState(false);
  const [previousPageDisabled, setPreviousPageDisabled] = useState(false);

  const clicked = () => {
    setButtonClicked(true);
  }
  const next = () => {
    //if (weeklyIncome.length <= pageNumber) {
    if (pageNumber < weeklyIncome.length) {
      setNextPageDisabled(false)
      setPageNumber(pageNumber + 1);
    } else {
      setNextPageDisabled(true)
    }
  };
  const previous = () => {
    if(pageNumber === 0) {
      setPreviousPageDisabled(true);
    } else {
      setPreviousPageDisabled(false);
      setPageNumber(pageNumber - 1);
    }
  }
  console.log(weeklyIncome.length)
  console.log(pageNumber)
  return (
    <div className="">
      <div className="bg-slate-800 p-3 font-mono text-white h-205 w-screen">
        <h1 className="text-3xl font-bold animate-pulse text-center sm:text-left">ComShop Income Management</h1>
        <nav className='text-center'>
          <ul className="flex flex-row text-l">
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Expenditures</li>
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Miscellaneous</li>
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Net Income</li>
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>About</li>
          </ul>
        </nav>
      </div>
      <div className='bg-slate-900 h-screen flex'>
        <div className='p-10'>
          <h1 className='text-4xl text-white'>Month: {monthNumber}</h1>
          <h1 className='text-4xl text-white'>Week: {weekNumber}</h1>
          <h1 className='text-4xl text-white'>Gross Income: {grossIncome}</h1>
          <h1 className='text-4xl text-white'>Net Income: {netIncome}</h1>
          <button onClick={clicked} className='bg-orange-400 pt-1 pb-1 pl-2 pr-2 rounded-lg mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Add Income</button>
        </div> 
        {buttonClicked && (
          <div>
            <form className=' mt-10 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              <label className='mb-5 text-4xl text-white'>FROM:</label>
              <input className='mb-5 text-3xl' type='date' {...register('weekStart')}  />
              <label className='mb-5 text-4xl text-white'>TO:</label>
              <input className='mb-5 text-3xl' type='date' {...register('weekEnd')} />
              <input className='mb-5 text-3xl' placeholder='Weekly Income' type="number" {...register("weeklyIncome", { min: 0, max: 999999 })} />
              <input className='mb-5 text-3xl' placeholder='Internet Cost' type="number" {...register("internetCost", { min: 0, max: 999999 })} />
              <input className='mb-5 text-3xl' placeholder='Electricity Cost' type="number" {...register("electricityCost", { min: 0, max: 999999 })} />
              <input className='text-3xl' placeholder='Miscellaneous' type="number" {...register("miscellaneous", { min: 0, max: 999999 })} />
              <input className='bg-orange-400 pt-1 pb-1 pl-2 pr-2 rounded-lg mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110' type='submit' />
            </form>
          </div>
        )}
        <div className='p-10 text-white'>
          <h1>Week {pageNumber + 1} </h1>
          <h1>Date: {weekStart[pageNumber]} {weekEnd[pageNumber]}</h1>
          <p>Weekly Income: {weeklyIncome[pageNumber]}</p>
          <p>Weekly Miscellaneous: {weeklyMiscellaneous[pageNumber]}</p>
          <button onClick={previous} className='bg-orange-400 pt-1 pb-1 pl-2 pr-2 rounded-lg mt-5 mr-2 cursor-pointer transition ease-in-out delay-50 hover:scale-110 text-black' disabled={previousPageDisabled}>Previous</button>
          <button onClick={next} className='bg-orange-400 pt-1 pb-1 pl-2 pr-2 rounded-lg mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110 text-black' disabled={nextPageDisabled}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
