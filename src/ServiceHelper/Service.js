import axios from 'axios';
// import { useContext, useMemo } from 'react';
// import { AuthContext } from './AuthContext';

const useAxiosInstance = () => {
    // const { token } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: 'http://172.17.15.213:8001/api/', // Base URL
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Token
        },
    });

    return axiosInstance;
};

export default useAxiosInstance;
