import './App.css';
import { useState, useEffect} from 'react';
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
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPageDisabled, setNextPageDisabled] = useState(false);
  const [previousPageDisabled, setPreviousPageDisabled] = useState(false);

  useEffect(() => {   
    if (pageNumber <= weeklyIncome.length) {
      setNextPageDisabled(false)
      setPageNumber(pageNumber + 1);
    } else {
      setNextPageDisabled(true)
    }
    if(pageNumber === 0) {
      setPreviousPageDisabled(true);
    } else {
      setPreviousPageDisabled(false);
      setPageNumber(pageNumber - 1);
    }
  },[pageNumber, weeklyIncome])

  const clicked = () => {
    setButtonClicked(true);
  }
  const next = () => {
    //if (weeklyIncome.length <= pageNumber) {
    
  };
  const previous = () => {
    
  }
  console.log(weeklyIncome.length)
  console.log(pageNumber)
  return (
    <div className="h-screen bg-slate-900">
      <div className="bg-slate-800 p-3 font-mono text-white h-205 w-screen sm:flex sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold animate-pulse text-center sm:text-left">ComShop Income Management</h1>
        <nav className='text-sm sm:text-lg'>
          <ul className="flex flex-row justify-center">
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>General info</li>
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Weekly Records</li>
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>About</li>
          </ul>
        </nav>
      </div>
      <div className='bg-slate-900 flex flex-col p-8 items-center'>
        <div className='p-5 bg-orange-500 rounded-3xl flex flex-col justify-center items-center'>
          <h1 className='text-3xl mb-3 text-white bg-slate-900 pl-5 pr-5 pb-1 pt-1 rounded-3xl'>General info:</h1>
          <p className='text-3xl text-white'>Month: {monthNumber}</p>
          <p className='text-3xl text-white'>Week: {weekNumber}</p>
          <p className='text-3xl text-white'>Gross Income: {grossIncome}</p>
          <p className='text-3xl text-white'>Net Income: {netIncome}</p>
          <button onClick={clicked} className='text-lg text-white bg-slate-600 pt-1 pb-1 pl-3 pr-3 rounded-3xl mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Add Income</button>
        </div> 
        {buttonClicked && (
          <div>
            <form className='mt-10 mb-5 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              <label className='mb-5 text-3xl text-white pl-5 pr-5 pb-1 pt-1 rounded-3xl'>FROM:</label>
              <input className='rounded-lg mb-5 text-3xl text-center' type='date' {...register('weekStart')}  />
              <label className='mb-5 text-3xl text-white pl-5 pr-5 pb-1 pt-1 rounded-3xl'>TO:</label>
              <input className='rounded-lg mb-5 text-3xl text-center' type='date' {...register('weekEnd')} />
              <input className='rounded-lg mb-5 text-2xl text-center' placeholder='Weekly Income' type="number" {...register("weeklyIncome", { min: 0, max: 999999 })} />
              <input className='rounded-lg mb-5 text-2xl text-center' placeholder='Internet Cost' type="number" {...register("internetCost", { min: 0, max: 999999 })} />
              <input className='rounded-lg mb-5 text-2xl text-center' placeholder='Electricity Cost' type="number" {...register("electricityCost", { min: 0, max: 999999 })} />
              <input className='rounded-lg text-2xl text-center' placeholder='Miscellaneous' type="number" {...register("miscellaneous", { min: 0, max: 999999 })} />
              <input className='bg-orange-400 pt-1 pb-1 pl-2 pr-2 rounded-lg mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110' type='submit' />
            </form>
          </div>
        )}
        {weeklyIncome.length === 0 && (
          <></>
        )}
        {weeklyIncome.length > 0 && (
          <div className='mt-5 bg-orange-500 rounded-3xl flex flex-col p-5'>
            <h1 className='text-3xl mt-3 mb-3 text-white bg-slate-900 pl-5 pr-5 pb-1 pt-1 rounded-3xl'>Weekly Records:</h1>
            <p className='text-xl text-white'>Week {pageNumber} </p>
            <p className='text-xl text-white'>Date: {weekStart[pageNumber]} to {weekEnd[pageNumber]}</p>
            <p className='text-xl text-white'>Income: {weeklyIncome[pageNumber]}</p>
            <p className='text-xl text-white'>Miscellaneous: {weeklyMiscellaneous[pageNumber]}</p>
            <button onClick={previous} className='text-lg text-white bg-slate-600 pt-1 pb-1 pl-2 pr-2 rounded-lg mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110' disabled={previousPageDisabled}>Previous</button>
            <button onClick={next} className='text-lg text-white bg-slate-600 pt-1 pb-1 pl-2 pr-2 rounded-lg mt-3 cursor-pointer transition ease-in-out delay-50 hover:scale-110' disabled={nextPageDisabled}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
