import {useState, useEffect} from "react";
import {API_URL} from "../const/API_URL";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            const data = await response.json();
            if (response && data) {
                setTransactions(data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return {transactions, loading}
}