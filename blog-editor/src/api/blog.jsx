import axios from 'axios';

const API = axios.create({
  baseURL: '/api/blogs',
  withCredentials: true,
});

export const login = (data) => API.post('/login', data);
export const fetchAll = () => API.get('/');
export const publish = (data) => API.post('/publish', data);

// ✅ Updated saveDraft: returns blog from response
export const saveDraft = async (data) => {
  const res = await API.post('/save-draft', data);
  return res.data; // includes { message, blog: { _id, title, ... } }
};

export const signup = async (data) => {
  const res = await API.post('/signup', data);
  return res.data; // return token directly
};

