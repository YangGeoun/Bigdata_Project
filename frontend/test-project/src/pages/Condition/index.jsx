import { useState, useEffect } from 'react'
import axios from 'axios'
import BarrelTemperatureChart from "./components/BarrelTemperatureChart";

function Condition() {
  const [count, setCount] = useState(0)
  const [conditionList, setConditionList] = useState([])

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/python/condition?date=2020-10-16')
    .then(res => {
      console.log(res); // 성공 시 데이터 출력
      setConditionList(res.data.data)
    })
    .catch(error => {
      console.error(error); // 에러 처리
    });

    return () => {
    }

  }, []); 

  
  return (
    <div>
      <h1>Vite + React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p>
        Click on the Vite and React logos to learn more
        <div>
          <BarrelTemperatureChart conditionList={conditionList} />
        </div>

      </p>
    </div>
  )
}

export default Condition
