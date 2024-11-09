import axios from 'axios';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY', // Use INTRADAY for 5min intervals
        symbol: symbol,
        interval: '5min',                // Set interval if using INTRADAY
        apikey: API_KEY,
      },
    });

    // Log and check the structure
    console.log("API Response:", response.data);

    // Adjust based on the actual response
    if (response.data["Time Series (5min)"]) {
      return response.data["Time Series (5min)"]; // Return the 5-min data
    } else {
      console.error("Expected time series data not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching stock data", error);
    return null;
  }
};
