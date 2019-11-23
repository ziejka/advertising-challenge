import React from "react"
import { Filter } from "./filter/Filter"
import './style.css'

export const Filters = ({ filters, handleFilterUpdate, dataSet }) => (
    <div className="filters-wrapper">
        <Filter
            category='Campaign'
            dataSet={dataSet}
            activeFilters={filters.get('Campaign')}
            handleFilterUpdate={handleFilterUpdate} />
        <Filter
            category='Datasource'
            dataSet={dataSet}
            activeFilters={filters.get('Datasource')}
            handleFilterUpdate={handleFilterUpdate} />
    </div>
)