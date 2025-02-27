import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PieChart from './components/Piechart';

function Product() {
  const [date, setDate] = useState("2020-10-16");
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate(); // React Router의 navigate 메서드

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/python/product', {
        params: { date }
      })
      .then(res => {
        console.log(res);
        setProductList(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // 해당 row를 클릭하면 제품의 이름과 날짜 정보를 포함한 URL로 이동하도록 처리
  const handleRowClick = (partName) => {
    // 원하는 라우트 구조에 맞게 URL을 생성합니다.
    // 예) "/product/<제품명>?date=<날짜>" 형태로 이동
    navigate(`/product/detail?date=${date}&partName=${partName.split(" ").pop()}`);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f7f9fc'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333' }}>Product Dashboard</h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          <label htmlFor="datePicker" style={{
            marginRight: '10px',
            fontSize: '1.2em',
            color: '#555'
          }}>
            날짜 선택:
          </label>
          <input
            id="datePicker"
            type="date"
            value={date}
            onChange={handleDateChange}
            style={{
              padding: '8px 12px',
              fontSize: '1em',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <p style={{ marginTop: '10px', fontSize: '1.1em', color: '#666' }}>
          선택한 날짜: {date || "날짜를 선택해주세요."}
        </p>
      </header>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <thead style={{ backgroundColor: '#e9ecef' }}>
            <tr>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 15px',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>제품명</th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 15px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>양품 갯수</th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 15px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>불량 갯수</th>
              <th style={{
                border: '1px solid #ddd',
                padding: '12px 15px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>그래프</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(productList).map(([partName, counts]) => (
              <tr
                key={partName}
                onClick={() => handleRowClick(partName)}
                style={{ borderBottom: '1px solid #ddd', cursor: 'pointer' }}
              >
                <td style={{ padding: '10px 15px', color: '#333', fontSize: '16px', fontWeight: 'bold' }}>
                  {partName}
                </td>
                <td style={{
                  padding: '10px 15px',
                  textAlign: 'center',
                  color: '#007bff',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {counts.pass}
                </td>
                <td style={{
                  padding: '10px 15px',
                  textAlign: 'center',
                  color: '#dc3545',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {counts.fail}
                </td>
                <td style={{
                  padding: '10px 15px',
                  textAlign: 'center',
                  width: '150px'
                }}>
                  <PieChart passCount={counts.pass} failCount={counts.fail} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
