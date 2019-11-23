import { getAvailableOptions } from "./operations"
import _ from "lodash"

it('should get Campaign categories', () => {
    const mockActiveFilters = []
    const mockDataSet = _.chain([{ Campaign: "CampaignA" }, { Campaign: "CampaignB", }, { Campaign: "CampaignB", }])

    expect(getAvailableOptions(mockActiveFilters, mockDataSet, "Campaign")).toMatchObject(["CampaignA", "CampaignB"])
})

it('should get empty array if category not exist', () => {
    const mockActiveFilters = []
    const mockDataSet = _.chain([{ Datasource: "DatasourceA", }, { Datasource: "DatasourceB", }, { Datasource: "DatasourceB", }])

    expect(getAvailableOptions(mockActiveFilters, mockDataSet, "Campaign")).toMatchObject([])
})

it('should filter only option that are not selected', () => {
    const mockActiveFilters = ['CampaignA', 'CampaignB']
    const mockDataSet = _.chain([{ Campaign: "CampaignA" }, { Campaign: "CampaignB", }, { Campaign: "CampaignC", }])

    expect(getAvailableOptions(mockActiveFilters, mockDataSet, "Campaign")).toMatchObject(["CampaignC"])
})

it('should filter with text input', () => {
    const mockActiveFilters = []
    const mockDataSet = _.chain([{ Campaign: "CampaignFoo" }, { Campaign: "CampaignBar", }, { Campaign: "CampaignC", }])
    const filteredText = 'Foo'

    expect(getAvailableOptions(mockActiveFilters, mockDataSet, "Campaign", filteredText)).toMatchObject(["CampaignFoo"])
})

it('should filter with text ignoring cases', () => {
    const mockActiveFilters = []
    const mockDataSet = _.chain([{ Campaign: "CampaignFoo" }, { Campaign: "CampaignBar", }, { Campaign: "CampaignC", }])
    const filteredText = 'foo'

    expect(getAvailableOptions(mockActiveFilters, mockDataSet, "Campaign", filteredText)).toMatchObject(["CampaignFoo"])
})

