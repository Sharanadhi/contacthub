import { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import './Datatables.scss';

function Datatables({ data }) {
  DataTable.use(DT);
  const [tableData, setTableData] = useState([]);

  const columns = [
    {data:'id'},
    {
      data: null,
      render: function (data) {
        return `<a className='dt-link' href='/contacts/${data.id}'>${data.first_name} ${data.last_name}</a>`;
      },
      title: 'Full Name',
    },
    { data: 'job_title' },
    { data: 'company' },
    { data: 'personal_phone' },
    { data: 'personal_email' },
  ];

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const tableOptions = {
    data: tableData,
    columns: columns,
    order: [[0, 'asc']], 
  };

  return (
    <DataTable {...tableOptions} className="display">
      <thead>
        <tr>
          <th>Contact id</th>
          <th>Full name</th>
          <th>Job title</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
    </DataTable>
  );
}

export default Datatables;
