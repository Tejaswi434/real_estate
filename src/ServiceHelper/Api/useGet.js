import { useState, useEffect, useRef } from 'react';
import useAxiosInstance from '../Service';

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosInstance = useAxiosInstance(); // Create the axiosInstance once
  const hasFetched = useRef(false); // Ref to track if the fetch has been done

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url); // Use the `url` passed to the hook
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (url && !hasFetched.current) {
      hasFetched.current = true; // Set to true after the first fetch
      fetchData();
    }
  }, [url]); // Remove axiosInstance from dependency array

  return { data, loading, error };
};

export default useGet;
