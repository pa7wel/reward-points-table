import {useState, useEffect} from "react";
import {API_URL} from "../const/API_URL";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (response && data) setTransactions(data);
        } catch {
            console.log('Data cannot be fetched')
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return {transactions}
}