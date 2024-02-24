"use client"
import React, { useState } from 'react';
import axios from 'axios';
import style from './page.module.css'

const Date = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (e.target.value) {
      document.getElementById('end_date').removeAttribute('required');
    } else {
      document.getElementById('end_date').setAttribute('required', 'required');
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/returnAllFIlterdData?startDate=${startDate}&endDate=${endDate}`);
      setResponseData(response.data);
      setError('');
    }
     catch (error) {
      setResponseData(null);
      setError('Error fetching data');
      console.log(error);
    }
     
  };

    const renderTableRows = (data) => {
      return Object.entries(data).map(([key, value]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      ));
    console.log(data.count_1_2_3_4_6_26_0_9_5_7);
  };

  return (
    <div >
    <div className={`${style.headStyle}`}>التقارير</div>

    <div className={`${style.datePage}`}>

      <div className={`${style.labelsStyle}`}>

      <label htmlFor="start_date"  className={`${style.lapelTitle}`}>
        من:
      </label>
      <input
        type="date"
        id="start_date"
        className={`${style.inputStyle}`}
        onChange={handleStartDateChange}
        value={startDate}
      />
      </div>
      <div  className={`${style.labelsStyle}`}> 
      <label htmlFor="end_date"className={`${style.lapelTitle}`}>
        إلي:
      </label>
      <input
        type="date"
        id="end_date"
        className={`${style.inputStyle}`}
        onChange={handleEndDateChange}
        value={endDate}
        required  
      />
      </div>
     <button type="button" className="btn btn-success " onClick={fetchData}>
        بحث
      </button>
    </div>
     
     {responseData && (
        <div  >
          <h2>إحصائيات الأعضاء:</h2>
          <div>
          <table className="table">
            <thead  className={`${style.tableStyle}`}>
              <tr>
                <th>الأعضاء</th>
                <th>الإحصائيات</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(responseData.counts)}
              {renderTableRows(responseData.countss)}
            </tbody>
          </table>
        </div>
        </div>
      )}

      
    </div>
  );
};

export default Date;
