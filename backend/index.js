require('dotenv').config();
const express = require('express');
const finnhub = require('finnhub');
const app = express();
const PORT = process.env.PORT;

// Initialize Finnhub API Client
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY;
const finnhubClient = new finnhub.DefaultApi();

// Function to get stock price
async function getSymbolPrice(symbol, callback) {
  try {
    finnhubClient.quote(symbol, (err, data, response) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log(`Stock Price for ${symbol}:`, data); // Log stock price data
        callback(null, data); // Return the stock price data
      }
    });
  } catch (error) {
    console.error(error);
    callback(error, null);
  }
}

// Function to get company profile
async function getCompanyProfile(symbol, callback) {
  try {
    finnhubClient.companyProfile2({ symbol }, (err, data, response) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log(`Company Profile for ${symbol}:`, data); // Log full company profile data
        callback(null, data); // Return the company profile data
      }
    });
  } catch (error) {
    console.error(error);
    callback(error, null);
  }
}

// API route to handle requests from the frontend
app.get('/api/stock/:symbol', (req, res) => {
  const symbol = req.params.symbol;

  // Fetch both stock price and company profile
  getSymbolPrice(symbol, (err, priceData) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching stock price' });
    }

    getCompanyProfile(symbol, (err, profileData) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching company profile' });
      }

      // Combine both price and profile data into a single response
      const stockData = {
        price: priceData,
        profile: profileData
      };

      res.json(stockData); // Send combined data as JSON response
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
