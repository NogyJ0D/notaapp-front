import axios from 'axios';

// const instance = axios.create({
//   baseURL: '127.0.0.1:8080'
// });

const URL = 'http://localhost:8080';
const DEBUG = true;

const get = (url) => {
  return axios.get(URL + url, { withCredentials: false })
    .then(res => {
      DEBUG && console.log(res);
      return res.data.data;
    })
    .catch(err => {
      DEBUG && console.log(err);
      return err.response.data;
    })
}

const post = (url, data) => {
  DEBUG && console.log(data);
  return axios.post(URL + url, data, { withCredentials: false })
    .then(res => {
      DEBUG && console.log(res);
      return res.data.data;
    })
    .catch(err => {
      DEBUG && console.log(err);
      return err.response.data;
    })
}

const put = (url, data) => {
  DEBUG && console.log(data);
  return axios.put(URL + url, data, { withCredentials: false })
    .then(res => {
      DEBUG && console.log(res);
      return res.data.data;
    })
    .catch(err => {
      DEBUG && console.log(err);
      return err.response.data;
    })
}

const del = (url) => {
  return axios.delete(URL + url, { withCredentials: false })
    .then(res => {
      DEBUG && console.log(res);
      return res.data.data;
    })
    .catch(err => {
      DEBUG && console.log(err);
      return err.response.data;
    })
}

export { get, post, put, del }