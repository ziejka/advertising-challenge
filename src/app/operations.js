import _ from "lodash"
import moment from "moment"

const parseDate = (dateString) => moment(dateString, "DD:MM:YYYY").format()
const memoizedParseDate = _.memoize(parseDate);
const PARSERS = [memoizedParseDate, null, null, _.toNumber, _.toNumber]
const convertTypes = (data, index) => {
    if (!PARSERS[index]) {
        return data
    }
    return PARSERS[index](data)
}

export function convertToArray(csvData) {
    const rows = _.chain(csvData).trim().split(/\n/)
    const header = rows
        .first()
        .split(',')
        .value()

    return rows
        .tail()
        .map(row => _.zipObject(header,
            _.chain(row)
                .split(',')
                .map(convertTypes)
                .value()))
        .value()
}

export function updateFilters(activeFilters, category, filterValue) {
    const newActiveFilters = new Map(activeFilters)
    const categoryFilters = newActiveFilters.get(category)

    return _.includes(categoryFilters, filterValue) ?
        newActiveFilters.set(category, _.without(categoryFilters, filterValue)) :
        newActiveFilters.set(category, [...categoryFilters, filterValue])
}