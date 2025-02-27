import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

function Detail() {
  const [conditionList, setConditionList] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // useNavigate 훅 사용

  // Extract date and partName from query parameters
  const dateParam = searchParams.get('date');
  const partName = searchParams.get('partName');
  const productName = `CN7 W/S SIDE MLD'G ${partName}`;

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/python/condition', {
        params: { date: dateParam, partName: productName }
      })
      .then((res) => {
        console.log(res.data);
        setConditionList(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchParams, dateParam, productName]);

  const containerStyles = {
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyles = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginTop: '20px'
  };

  const thStyles = {
    backgroundColor: '#f5f5f5',
    padding: '12px 8px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '14px',
    cursor: 'pointer' // 마우스를 올렸을 때 클릭 가능한 느낌을 줌
  };

  const tdStyles = {
    padding: '10px 8px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '13px'
  };

  // 헤더 클릭 시 라우팅 처리
  const handleHeaderClick = (colName) => {
    navigate(`/product/shap?col=${colName}`);
  };
    return (
      <div style={containerStyles}>
        <h1 style={headerStyles}>
          {productName} - {dateParam}
        </h1>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles} onClick={() => handleHeaderClick('time_stamp')}>Time Stamp</th>
              <th style={thStyles} onClick={() => handleHeaderClick('is_passed')}>PassOrFail</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Injection_Time')}>Injection Time</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Cycle_Time')}>Cycle Time</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Clamp_Close_Time')}>Clamp Close Time</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Cushion_Position')}>Cushion Position</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Plasticizing_Position')}>Plasticizing Position</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Average_Screw_RPM')}>Average Screw RPM</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Max_Switch_Over_Pressure')}>Max Switch Over Pressure</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Barrel_Temperature_3')}>Barrel Temperature 3</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Barrel_Temperature_5')}>Barrel Temperature 5</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Barrel_Temperature_6')}>Barrel Temperature 6</th>
              <th style={thStyles} onClick={() => handleHeaderClick('Hopper_Temperature')}>Hopper Temperature</th>
            </tr>
          </thead>
  
          <tbody>
            {conditionList.map((item) => {
              const isTargetDate = item.time_stamp === '2020-10-27';
              const isFailed = !item.is_passed;
  
              return (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: item.is_passed ? 'white' : 'rgba(255, 0, 0, 0.2)'
                  }}
                >
                  {/* Time Stamp */}
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("time_stamp", new Date(item.time_stamp).toLocaleString())
                    }
                  >
                    {new Date(item.time_stamp).toLocaleString()}
                  </td>
  
                  {/* PassOrFail */}
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("is_passed", item.is_passed ? "Passed" : "Failed")
                    }
                  >
                    {item.is_passed ? "Passed" : "Failed"}
                  </td>
  
                  {/* Injection Time */}
                  <td
                    style={{
                      ...tdStyles,
                      backgroundColor: isTargetDate && isFailed ? 'rgba(255, 0, 0, 0.6)' : 'inherit'
                    }}
                    onClick={() =>
                      handleHeaderClick("Injection_Time", Number(item.injection_time).toFixed(2))
                    }
                  >
                    {Number(item.injection_time).toFixed(2)}
                  </td>
  
                  {/* Cycle Time */}
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Cycle_Time", Number(item.cycle_time).toFixed(2))
                    }
                  >
                    {Number(item.cycle_time).toFixed(2)}
                  </td>
  
                  {/* Clamp Close Time */}
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Clamp_Close_Time", Number(item.clamp_close_time).toFixed(2))
                    }
                  >
                    {Number(item.clamp_close_time).toFixed(2)}
                  </td>
  
                  {/* Cushion Position */}
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Cushion_Position", Number(item.cushion_position).toFixed(2))
                    }
                  >
                    {Number(item.cushion_position).toFixed(2)}
                  </td>
  
                  {/* Plasticizing Position */}
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Plasticizing_Position", Number(item.plasticizing_position).toFixed(2))
                    }
                  >
                    {Number(item.plasticizing_position).toFixed(2)}
                  </td>
  
                  {/* Average Screw RPM */}
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Average_Screw_RPM", Number(item.average_screw_rpm).toFixed(2))
                    }
                  >
                    {Number(item.average_screw_rpm).toFixed(2)}
                  </td>
  
                  {/* Max Switch Over Pressure */}
                  <td
                    style={{
                      ...tdStyles,
                      backgroundColor: isTargetDate && isFailed ? 'rgba(255, 0, 0, 0.6)' : 'inherit'
                    }}
                    onClick={() =>
                      handleHeaderClick("Max_Switch_Over_Pressure", Number(item.max_switch_over_pressure).toFixed(2))
                    }
                  >
                    {Number(item.max_switch_over_pressure).toFixed(2)}
                  </td>
  
                  {/* Barrel Temperatures and Hopper Temperature */}
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Barrel_Temperature_3", Number(item.barrel_temperature_3).toFixed(2))
                    }
                  >
                    {Number(item.barrel_temperature_3).toFixed(2)}
                  </td>
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Barrel_Temperature_5", Number(item.barrel_temperature_5).toFixed(2))
                    }
                  >
                    {Number(item.barrel_temperature_5).toFixed(2)}
                  </td>
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Barrel_Temperature_6", Number(item.barrel_temperature_6).toFixed(2))
                    }
                  >
                    {Number(item.barrel_temperature_6).toFixed(2)}
                  </td>
                  <td
                    style={tdStyles}
                    onClick={() =>
                      handleHeaderClick("Hopper_Temperature", Number(item.hopper_temperature).toFixed(2))
                    }
                  >
                    {Number(item.hopper_temperature).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Detail;