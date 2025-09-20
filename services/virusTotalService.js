import axios from 'axios';

const BASE_URL = 'https://www.virustotal.com/api/v3/files';

export const getFileReport = async (hash) => {
  const VT_API_KEY = process.env.VT_API_KEY;
 // console.log('VT_API_KEY:', VT_API_KEY); // revisa API
  const response = await axios.get(`${BASE_URL}/${hash}`, {
    headers: {
      'x-apikey': VT_API_KEY,
    },
  });
  return response.data;

};
