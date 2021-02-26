const  EMPLOYEES = [
  {
    Header: 'ID',
    Footer: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Code',
    Footer: 'Code',
    accessor: 'code'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: d => `${d.first_name} ${d.last_name}`
  },
  {
    Header: 'Profession',
    Footer: 'Profession',
    accessor: 'profession'
  },
  {
    Header: 'Color',
    Footer: 'Color',
    accessor: 'color'
  },
  {
    Header: 'City',
    Footer: 'City',
    accessor: 'city'
  },
  {
    Header: 'Branch',
    Footer: 'Branch',
    accessor: 'branch'
  },
  {
    id: 'Assigned',
    Header: '',
    Footer: 'assigned',
    // eslint-disable-next-line eqeqeq
    accessor: d => d.assigned==false ? '' : 'assigned'
   }
];

export default EMPLOYEES;