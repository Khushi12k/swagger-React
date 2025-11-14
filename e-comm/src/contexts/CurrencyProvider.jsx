import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const currencyContext = createContext()

const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("INR")
    const [rates, setRates] = useState({ INR: 1, USD: 1, EUR: 1 })

    useEffect(() => {
        async function fetchApi() {
            const res = await axios.get(
                "https://v6.exchangerate-api.com/v6/99e71576ea6e1d6f557f9c63/latest/INR"
            )
            console.log(res.data)
            setRates({
                INR: 1,
                USD: res.data.conversion_rates.USD,
                EUR: res.data.conversion_rates.EUR,
            })
        }

        fetchApi() 
    }, [])


    function convert(priceInINR) {
        return priceInINR * rates[currency]
    }

    return (
        <currencyContext.Provider value={{ currency, setCurrency,convert }}>
            {children}
        </currencyContext.Provider>
    )
}

export function useCurrency() {
    return useContext(currencyContext)
}

export default CurrencyProvider
