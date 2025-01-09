import axios from 'axios';

import { MYPEPE_BASE_URL } from './helpers/constants';

export const mypepe = axios.create({
  baseURL: MYPEPE_BASE_URL,
});
