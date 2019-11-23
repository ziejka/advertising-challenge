import _ from "lodash"
import moment from "moment"

export const getCumulativeValuesByDate = (dataSet, filters) =>
    _.chain(dataSet)
        .filter(adData => {
            let result = true
            filters.forEach((activeFilters, category) => {
                if (_.isEmpty(activeFilters)) return
                if (!_.includes(activeFilters, _.get(adData, category))) {
                    result = false
                }
            })
            return result
        })
        .groupBy('Date')
        .map((obj, key) => ({
            Date: key,
            Clicks: _.sumBy(obj, 'Clicks'),
            Impressions: _.sumBy(obj, 'Impressions')
        }))
        .value()

export const fillMissingDays = (accumulateDataByDate) => {
    const startDate = moment(_.first(accumulateDataByDate).Date)
    const endDate = moment(_.last(accumulateDataByDate).Date)

    const datesArray = [startDate]
    while (_.last(datesArray).isBefore(endDate)) {
        datesArray.push(_.last(datesArray).clone().add("1", 'day'))
    }

    return _.map(datesArray, date => {
        const obj = _.find(accumulateDataByDate, adData => {
            return adData.Date === date.format()
        }) || {}

        return {
            Date: date.format("DD, MMM"),
            Clicks: obj.Clicks || null,
            Impressions: obj.Impressions || null
        }
    })
}

export function convertToChartData(dataSet, filters) {
    const accumulateDataByDate = getCumulativeValuesByDate(dataSet, filters)
    const parsedData = _.isEmpty(accumulateDataByDate) ? [{
        Date: null,
        Clicks: null,
        Impressions: null
    }] : fillMissingDays(accumulateDataByDate)

    return {
        labels: _.map(parsedData, 'Date'),
        datasets: [{
            label: 'Clicks',
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgb(54, 162, 235)",
            fill: false,
            data: _.map(parsedData, 'Clicks'),
            yAxisID: 'y-axis-1',
            tension: 0.1,
        }, {
            label: 'Impressions',
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192)",
            fill: false,
            data: _.map(parsedData, 'Impressions'),
            yAxisID: 'y-axis-2',
            tension: 0.1,
        }]
    }
}