import React, { useState, useEffect } from 'react'
import _ from "lodash"

import './style.css'
import { convertToArray, updateFilters } from './operations'
import { Chart } from '../chart'
import { Error } from "../error"
import { Filters } from '../filters'

export const App = () => {
    const [hasError, setErrors] = useState(false)
    const [dataSet, setDataSet] = useState({})
    const [filters, setFilter] = useState(new Map([['Campaign', []], ['Datasource', []]]))

    const handleFilterUpdate = (category, filterValue) => {
        setFilter(updateFilters(filters, category, filterValue))
    }

    const fetchData = () => {
        fetch("/DAMKBAoDBwoDBAkOBAYFCw.csv")
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText)
                }
                return res
            })
            .then(res => res.text())
            .then(res => setDataSet(convertToArray(res)))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (hasError) return <Error />

    return !_.isEmpty(dataSet) ?
        <React.Fragment>
            <Filters filters={filters} handleFilterUpdate={handleFilterUpdate} dataSet={dataSet} />
            <Chart dataSet={dataSet} filters={filters} />
        </React.Fragment> :
        <div className="loader" />
}