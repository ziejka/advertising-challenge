import React, { useState, useRef, useEffect } from "react"
import './style.css'
import { getAvailableOptions } from "./operations"

export const Filter = ({ category, dataSet, activeFilters, handleFilterUpdate }) => {
    const [focused, setFocused] = useState(false)
    const [filterText, setFilterText] = useState('')
    const inputRef = useRef(null)

    const onOptionClicked = (event) => {
        setFocused(true)
        handleFilterUpdate(category, event.target.innerHTML)
    }
    const onButtonClick = (event) => handleFilterUpdate(category, event.target.innerHTML)
    const showOptions = () => setFocused(true)
    const hideOptions = () => setFocused(false)
    const onInputChange = (event) => setFilterText(event.target.value)

    useEffect(() => {
        if (focused) {
            inputRef.current.focus();
        }
    }, [focused]);

    return (
        <div className="filter-wrapper">
            <p>Filter by {category}:</p>
            <div className="active-filters-wrapper">
                {activeFilters.map(activeFilter =>
                    <button key={`key-${activeFilter}`} onClick={onButtonClick}>{activeFilter}</button>)}
            </div>
            <div className='multi-select'>
                <input type='text' value={filterText} onFocus={showOptions} ref={inputRef} onBlur={hideOptions} onChange={onInputChange} />
                <ul className={`items ${!focused && 'hide'}`}>
                    {getAvailableOptions(activeFilters, dataSet, category, filterText).map(option => <li key={`key-${option}`} onClick={onOptionClicked}>{option}</li>)}
                </ul>
            </div>
        </div >)
}
