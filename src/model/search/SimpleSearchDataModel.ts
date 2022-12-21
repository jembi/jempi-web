import moment from 'moment'

const SimpleSearchDataModel = {
  parameters: [
    {
      field: 'NationalId',
      value: '',
      exact: true,
      distance: 1
    },
    {
      field: 'FirstName',
      value: '',
      exact: true,
      distance: 1
    },
    {
      field: 'LastName',
      value: '',
      exact: true,
      distance: 1
    },
    {
      field: 'DateOfBirth',
      value: moment().format('DD/MM/YYYY'),
      exact: true,
      distance: 1
    }
  ]
}

export default SimpleSearchDataModel
