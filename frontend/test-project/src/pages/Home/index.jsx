import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [count, setCount] = useState(0)

  useEffect(() => {

    // axios.get('http://127.0.0.1:8000/python/condition?date=2020-10-16')
    // .then(res => {
    //   console.log(res); // 성공 시 데이터 출력
    //   setConditionList(res.data.data)
    // })
    // .catch(error => {
    //   console.error(error); // 에러 처리
    // });

    return () => {
    }

  }, []); 

  
  return (
    <div>
      <h1>Home</h1>
      
    </div>
  )
}

export default Home
