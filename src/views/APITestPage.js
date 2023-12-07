// APITestPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRest } from '../utils/helpers';
import fetchDataForNextTwoMonths from '../utils/apiUtils';

const dataFetched = (data) => ({
  type: 'DATA_FETCHED',
  payload: data,
});

const APITestPage = () => {
  const [{ resource: precipResource, rest: precipRest }] = useRest('precipitation');
  const [{ resource: tempResource, rest: tempRest }] = useRest('temp-avg');
  const [{ resource: windResource, rest: windRest }] = useRest('speed');
  const dispatch = useDispatch();
  const data = useSelector(({ exampleReducer }) => exampleReducer.data);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataForNextTwoMonths(precipResource, precipRest, tempResource, tempRest, windResource, windRest);
      dispatch(dataFetched(result));
    };

    fetchData();
  }, [precipResource, precipRest, tempResource, tempRest, windResource, windRest, dispatch]);

  return (
    <div>
      <h1>Results Page</h1>
      {data && (
        <div>
          <h2>Sunshine Data</h2>
          {/* Render sunshine data */}
          {/* Example: {data.sunshine.map(item => <div key={item.id}>{item.name}</div>)} */}

          <h2>Temperature Data</h2>
          {/* Render temperature data */}
          {/* Example: {data.temperature.map(item => <div key={item.id}>{item.name}</div>)} */}

          <h2>Wind Data</h2>
          {/* Render wind data */}
          {/* Example: {data.wind.map(item => <div key={item.id}>{item.name}</div>)} */}
        </div>
      )}
    </div>
  );
};

export default APITestPage;