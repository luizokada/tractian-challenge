import axios from 'axios';

const TractionApi = axios.create({
  baseURL: 'https://fake-api.tractian.com/',
});

export { TractionApi };
