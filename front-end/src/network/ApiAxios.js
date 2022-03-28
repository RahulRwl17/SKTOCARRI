import axios from 'axios';
import config from "../config";

// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create({
    baseURL: config.WS_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = (token ? token : '');
    config.headers.ContentType = 'application/json';
    return config;
});

export const getAllAdmin = async () => (
    await instance.post('admin/all')
);

export const getAllUsers = async () => (
    await instance.post('user/all')
);

export const getSingleUsers = async (_id) => (
    await instance.post('user/single', { _id })
);

export const Delete = async (_id) => (
    await instance.post('user/single/delete', { _id })
);

export const register = async (name, email, password, phone, agency, role) => {
    var pass = password
    return await instance.post('admin/register', { name, email, pass, phone, agency, role })
};

export const registerUser = async (fname, lname, email, password, mobile, tempAddress, perAddress, dob) => {
    var pass = password
    return await instance.post('user/register', { fname, lname, email, pass, mobile, tempAddress, perAddress, dob })
};

export const confirmRegister = async id => (
    await instance.post(`admin/confirm/${id}`)
);

export const forgotPassword = async email => (
    await instance.post('admin/forgotpassword', { email })
);

export const confirmReset = async (id, password) => (
    await instance.post(`admin/resetpass/${id}`, { password })
);

export const login = async (email, password) => (
    await instance.post('admin/login', { email, password })
);

export const logout = async token => (
    await instance.post('admin/logout', { token })
);

export const edit = async (userID, name, email) => (
    await instance.post('/admin/edit', { userID, name, email })
);

export const userEdit = async (_id, mobile, perAddress, tempAddress) => (
    await instance.post('/user/edit', { _id, mobile, perAddress, tempAddress })
);

export const Confirm = async (_id) => (
    await instance.post('/user/confirm', { _id })
);
