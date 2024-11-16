import axios from 'axios';

export const getExchangeRate = async (baseCurrency = 'USD', targetCurrency = 'INR') => {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const rate = response.data.rates[targetCurrency];
        if (!rate) throw new Error(`Exchange rate for ${targetCurrency} not available.`);
        return rate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
};
