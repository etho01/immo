
import axios from "axios";

import userStore from '../store/userStore.js';

axios.defaults.headers.common = {'Authorization': `bearer ${userStore.getToken}`}
export default axios;