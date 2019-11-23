import _ from 'lodash'
import { getCumulativeValuesByDate, fillMissingDays } from './operations'

it('Should return accumulate data by Date', () => {
    const mockDataSet = _.times(10, () => ({
        Date: "11.10.2019",
        Clicks: 10,
        Impressions: 1
    }))
    const expected = [{
        Date: "11.10.2019",
        Clicks: 100,
        Impressions: 10
    }]

    expect(getCumulativeValuesByDate(mockDataSet, [])).toMatchObject(expected)
})

it('Should filter dataSet', () => {
    const mockDataSet = [..._.times(10, () => ({
        Date: "11.10.2019",
        Clicks: 10,
        Impressions: 1,
        Campaign: 'A'
    })),
    ..._.times(10, () => ({
        Date: "11.10.2019",
        Clicks: 10,
        Impressions: 1,
        Campaign: 'B'
    }))]
    const filters = new Map([['Campaign', ['A']]])
    const expected = [{
        Date: "11.10.2019",
        Clicks: 100,
        Impressions: 10
    }]

    expect(getCumulativeValuesByDate(mockDataSet, filters)).toMatchObject(expected)
})

it('Should return all if empty filter', () => {
    const mockDataSet = [..._.times(10, () => ({
        Date: "11.10.2019",
        Clicks: 10,
        Impressions: 1,
        Campaign: 'A'
    })),
    ..._.times(10, () => ({
        Date: "11.10.2019",
        Clicks: 10,
        Impressions: 1,
        Campaign: 'B'
    }))]

    const filters = new Map([['Campaign', []]])
    const expected = [{
        Date: "11.10.2019",
        Clicks: 200,
        Impressions: 20
    }]

    expect(getCumulativeValuesByDate(mockDataSet, filters)).toMatchObject(expected)
})

it('Should fill missing date with null values', () => {
    const mockValues = [{
        Date: "2019-11-01T00:00:00+01:00",
        Clicks: 200,
        Impressions: 20
    },
    {
        Date: "2019-11-03T00:00:00+01:00",
        Clicks: 200,
        Impressions: 20
    }]
    const expected = [{
        Date: "01, Nov",
        Clicks: 200,
        Impressions: 20
    },
    {
        Date: "02, Nov",
        Clicks: null,
        Impressions: null
    },
    {
        Date: "03, Nov",
        Clicks: 200,
        Impressions: 20
    }]

    expect(fillMissingDays(mockValues)).toMatchObject(expected)
})