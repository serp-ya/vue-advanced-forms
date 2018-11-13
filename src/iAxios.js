import axios from 'axios';

const iAxios = axios.create({
  baseURL: 'https://vue-advanced-forms.firebaseio.com',
});

iAxios.defaults.headers.common['SOMETHING'] = 'something';

export default iAxios
