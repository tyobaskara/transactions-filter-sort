import axios from 'axios';

const getTransactions = async () => {
  const result = {
    data: [],
    error: ''
  };
  
  try {
    const result = await axios.get(`https://nextar.flip.id/frontend-test`);
    
    return {
      ...result,
      data: Object.values(result.data)
    }
  } catch(error){
    return {
      ...result,
      error
    }
  }
};

const transactionServices = {
  getTransactions
};

export default transactionServices;
