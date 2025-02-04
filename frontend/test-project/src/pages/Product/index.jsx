import { useState, useEffect } from 'react'
import axios from 'axios'
import PieChart from './components/Piechart'

function Product() {

  const [ date, setDate ] = useState("2020-10-16")
  const [ productList, setProductList ] = useState([])

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/python/product', {
      params: { date : date }}
    )
    .then(res => {
      console.log(res);
      setProductList(res.data.data)
      console.log(res.data.data)
    })
    .catch(err => {
      console.error(err);
    });

    return () => {
    }

  }, [date]); 

  const handleDateChange = (event) => {
    setDate(event.target.value); // 선택된 날짜를 상태에 저장
  };
  
  return (
    <div>
      <h1>Product</h1>
      <h1>날짜 선택</h1>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      <p>선택한 날짜: {date || "날짜를 선택해주세요."}</p>
      <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>제품명</th>
            <th>양품 (Pass)</th>
            <th>불량품 (Fail)</th>
            <th>그래프</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(productList).map(([partName, counts]) => (
            <tr key={partName}>
              <td>{partName}</td>
              <td>{counts.pass}</td>
              <td>{counts.fail}</td>
              <td style={{ width: "10px", height: "10px" }}>
                <PieChart passCount={counts.pass} failCount={counts.fail} />
              </td>
              {/* <div style={width:"300px", height:"300px"}></div> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Product
