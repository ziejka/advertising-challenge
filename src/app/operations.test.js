import { updateFilters } from "./operations"

it('Should add filter value to category', () => {
    const mockActiveFilters = new Map([['Campaign', ['CampaignA', 'CampaignB']], ['Datasource', ['DatasourceA']]])
    const expected = new Map([['Campaign', ['CampaignA', 'CampaignB', 'CampaignC']], ['Datasource', ['DatasourceA']]])
    expect(updateFilters(mockActiveFilters, 'Campaign', 'CampaignC')).toMatchObject(expected)
})

it('Should remove filter value to category', () => {
    const mockActiveFilters = new Map([['Campaign', ['CampaignA', 'CampaignB']], ['Datasource', ['DatasourceA']]])
    const expected = new Map([['Campaign', ['CampaignA']], ['Datasource', ['DatasourceA']]])
    expect(updateFilters(mockActiveFilters, 'Campaign', 'CampaignB')).toMatchObject(expected)
})