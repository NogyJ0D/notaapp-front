import axios from 'axios';
import { URL } from '../config';

const instance = axios.create({
  baseURL: URL
});

const get = (url) => {
  return instance.get(url, { withCredentials: true })
    .then(res => { return res })
    .catch(err => { return err })
}

const post = (url, data) => {
  console.log(url)
  console.log(data)
  return instance.post(url, data, { withCredentials: false })
    .then(res => { 
      console.log(res)
      return res
     })
    .catch(err => { return err })
}

const put = (url, data) => {
  return instance.put(url, data, { withCredentials: true })
    .then(res => { return res })
    .catch(err => { return err })
}

const del = (url) => {
  return instance.delete(url, { withCredentials: true })
    .then(res => { return res })
    .catch(err => { return err })
}

export default instance
export { get, post, put, del }