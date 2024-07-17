import './App.css';
import { useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { Button, Label, Modal } from "flowbite-react";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setWeeklyIncome([...weeklyIncome, data.weeklyIncome])
    setWeeklyMiscellaneous([...weeklyMiscellaneous, data.miscellaneous])
    setWeeklyInternetCost([...weeklyInternetCost, data.internetCost])
    setWeeklyElectricityCost([...weeklyElectricityCost, data.electricityCost])
    setGrossIncome(grossIncome + Number(data.weeklyIncome));
    setNetIncome(netIncome + Number(data.weeklyIncome - data.miscellaneous - data.internetCost - data.electricityCost)) 
    setOpenModal(false);
    setWeekNumber(weekNumber + 1);
    setWeekStart([...weekStart, data.weekStart]);
    setWeekEnd([...weekEnd, data.weekEnd]);
    if(weekNumber === 3) {
      setMonthNumber(monthNumber + 1);
      setWeekNumber(0);
    }
    const newObj = data; 
    const newArray = [...allData, newObj]; 
    setAllData(newArray); 
  } 
  const [allData, setAllData] = useState([])
  const [weeklyIncome, setWeeklyIncome] = useState([])
  const [weeklyMiscellaneous, setWeeklyMiscellaneous] = useState([])
  const [weeklyElectricityCost, setWeeklyElectricityCost] = useState([])
  const [weeklyInternetCost, setWeeklyInternetCost] = useState([])
  const [weekStart, setWeekStart] = useState([])
  const [weekEnd, setWeekEnd] = useState([])
  const [weekNumber, setWeekNumber] = useState(0);
  const [monthNumber, setMonthNumber] = useState(0);
  const [grossIncome, setGrossIncome] = useState(0);
  const [netIncome, setNetIncome] = useState(0);     
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPageDisabled, setNextPageDisabled] = useState(false);
  const [previousPageDisabled, setPreviousPageDisabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (pageNumber < weeklyIncome.length) {
      setNextPageDisabled(false)
    } else {
      setNextPageDisabled(true)
    }
    if(pageNumber === 1) {
      setPreviousPageDisabled(true);
    } else {
      setPreviousPageDisabled(false);
    }
  },[pageNumber, weeklyIncome])

  const next = () => {
    //if (weeklyIncome.length <= pageNumber) {
    setPageNumber(pageNumber + 1);
  };
  const previous = () => {
    setPageNumber(pageNumber - 1);
  }
  const edit = () => {
    
  }
  const onCloseModal = () => {
    setOpenModal(false);
  }
  const valueFormatter = (value) => `${value}PHP`;
  const chartSetting = {
    yAxis: [
      {
        label: 'Income (PHP)',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
  
  return (
    <div className="h-screen bg-slate-900">
      <div className="bg-slate-800 p-3 font-mono text-white h-205 w-screen sm:flex sm:items-center sm:justify-between border-solid  border-b-2">
        <h1 className="text-3xl font-bold animate-pulse text-center sm:text-left">ComShop Income Management</h1>
        <nav className='text-sm sm:text-lg'>
          <ul className="flex flex-row justify-center">
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>General info</li>
            <li className='peer/records mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Weekly Records</li>
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Graph</li>
            <li className='mr-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>About</li>
          </ul>
        </nav>
      </div>
      <Modal className='backdrop-blur-sm' show={openModal} size="sm" onClose={onCloseModal} popup>
          <Modal.Body className='bg-slate-800'>
            <div>
              <form className='mt-10 sm:mt-0 mb-5 flex flex-col p-5' onSubmit={handleSubmit(onSubmit)}>
                <label className='mb-5 text-3xl sm:text-4xl text-white pl-5 pr-5 pb-1 pt-1 rounded-3xl'>FROM:</label>
                <input className='rounded-lg mb-5 text-3xl sm:text-4xl text-center' type='date' {...register('weekStart')}  />
                <label className='mb-5 text-3xl sm:text-4xl text-white pl-5 pr-5 pb-1 pt-1 rounded-3xl'>TO:</label>
                <input className='rounded-lg mb-5 text-3xl sm:text-4xl text-center' type='date' {...register('weekEnd')} />
                <input className='rounded-lg mb-5 text-2xl sm:text-3xl text-center' placeholder='Weekly Income' type="number" {...register("weeklyIncome", { min: 0, max: 999999 })} />
                <input className='rounded-lg mb-5 text-2xl sm:text-3xl text-center' placeholder='Internet Cost' type="number" {...register("internetCost", { min: 0, max: 999999 })} />
                <input className='rounded-lg mb-5 text-2xl sm:text-3xl text-center' placeholder='Electricity Cost' type="number" {...register("electricityCost", { min: 0, max: 999999 })} />
                <input className='rounded-lg text-2xl sm:text-3xl text-center' placeholder='Miscellaneous' type="number" {...register("miscellaneous", { min: 0, max: 999999 })} />
                <input className='bg-orange-400 pt-1 pb-1 pl-2 pr-2 rounded-3xl mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110  sm:text-3xl text-white' type='submit' />
              </form>
            </div>
          </Modal.Body>
      </Modal>
      <div className='bg-slate-900 flex flex-col sm:flex-col p-8 sm:h-full sm:flex-wrap items-center sm:items-start'>
        <div className='border-solid border-2 p-5 bg-orange-500 sm:bg-transparent sm:border-0 rounded-3xl flex flex-col justify-center items-center sm:items-start'>
          <h1 className='text-3xl sm:text-5xl mb-3 text-white sm:text-orange-500 sm:font-bold bg-slate-900 pl-5 pr-5 pb-1 pt-1 sm:pl-0 sm:pr-0 sm:pb-0 sm:pt-0 rounded-3xl'>General info:</h1>
          <p className='text-3xl sm:text-4xl text-white'>Month: {monthNumber}</p>
          <p className='text-3xl sm:text-4xl text-white'>Week: {weekNumber}</p>
          <p className='text-3xl sm:text-4xl text-white'>Gross Income: {grossIncome}</p>
          <p className='text-3xl sm:text-4xl text-white'>Net Income: {netIncome}</p>
          <Button onClick={() => setOpenModal(true)} className='text-lg text-white bg-slate-600 pt-2 pb-2 pl-5 pr-5 rounded-3xl mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Add Income</Button>
        </div>  
        {weeklyIncome.length === 0 && (
          <></>
        )}
        {weeklyIncome.length > 0 && (
          <div className='border-solid border-2 mt-5 sm:mt-0 bg-orange-500 sm:bg-transparent sm:border-0 rounded-3xl flex flex-col p-5'>
            <h1 className='text-3xl mt-3 mb-3 text-white sm:text-orange-500 sm:font-bold bg-slate-900 pl-5 pr-5 pb-1 pt-1 sm:pl-0 sm:pr-0 sm:pb-0 sm:pt-0 rounded-3xl sm:text-5xl'>Weekly Records:</h1>
            <p className='text-xl sm:text-2xl text-white'>Week {pageNumber} </p>
            <p className='text-xl sm:text-2xl text-white'>Date: {weekStart[pageNumber-1]} to {weekEnd[pageNumber-1]}</p>
            <p className='text-xl sm:text-2xl text-white'>Income: {weeklyIncome[pageNumber-1]}</p>
            <p className='text-xl sm:text-2xl text-white'>Miscellaneous: {weeklyMiscellaneous[pageNumber-1]}</p>
            <p className='text-xl sm:text-2xl text-white'>Internet Cost: {weeklyInternetCost[pageNumber-1]}</p>
            <p className='text-xl sm:text-2xl text-white'>Electricity Cost: {weeklyElectricityCost[pageNumber-1]}</p>
            <div className='flex flex-col sm:block'>
              <button onClick={previous} className='sm:mr-2 text-lg text-white bg-slate-600 pt-1 pb-1 pl-3 pr-3 rounded-3xl mt-5 cursor-pointer transition ease-in-out delay-50 hover:scale-110' disabled={previousPageDisabled}>Previous</button>
              <button onClick={next} className='sm:mr-2 text-lg text-white bg-slate-600 pt-1 pb-1 pl-3 pr-3 rounded-3xl mt-2 cursor-pointer transition ease-in-out delay-50 hover:scale-110' disabled={nextPageDisabled}>Next</button>
              <button onClick={edit} className='text-lg text-white bg-slate-600 pt-1 pb-1 pl-3 pr-3 rounded-3xl mt-2 cursor-pointer transition ease-in-out delay-50 hover:scale-110'>Edit</button>
            </div>
          </div>
        )}
        {weeklyIncome.length > 0 && (
         <div className='mt-6 border-2 bg-white p-2 rounded-2xl'>
          <h1 className='text-3xl underline text-white sm:text-orange-500 sm:font-bold pl-5 pr-5 pb-1 pt-1 sm:pl-0 sm:pr-0 sm:pb-0 sm:pt-0 rounded-3xl sm:text-5xl sm:mb-5 sm:text-center'>Income Graph:</h1>
           <BarChart
              dataset={allData}
              xAxis={[{ dataKey: 'weekStart' , scaleType: 'band'}]}
              series={[
                { dataKey: 'weeklyIncome', label: 'Income', valueFormatter },
              ]}
              {...chartSetting}
              width={1000}
              height={580}
              margin={{ left: 70}}
            />
        </div>
        )}
      </div>   
    </div>
  );
}

export default App;
