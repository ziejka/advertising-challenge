import _ from "lodash"

export const getAvailableOptions = (activeFilters, dataSet, category, filterText = '') =>
    _.chain(dataSet)
        .unionBy(category)
        .map(category)
        .compact()
        .without(...activeFilters)
        .filter(filterValue => _.includes(_.toLower(filterValue), _.toLower(filterText)))
        .value()