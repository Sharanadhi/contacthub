import { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import './Datatables.scss';

function Datatables({ data }) {
  DataTable.use(DT);
  const [tableData, setTableData] = useState([]);

  const columns = [
    // { data: 'id', title: 'Contact ID' },
    {
      data: null,
      render: function (data) {
        return `<a className='dt-link' href='/contacts/${data.id}'>${data.first_name} ${data.last_name}</a>`;
      },
      title: 'Full Name',
    },
    { data: 'job_title', title: 'Job Title' },
    { data: 'company', title: 'Company' },
    { data: 'personal_phone', title: 'Phone' },
    { data: 'personal_email', title: 'Email' },
  ];

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const tableOptions = {
    data: tableData,
    columns: columns,
    order: []
  };

  return (
    <DataTable {...tableOptions} className="display">
      <thead>
        <tr>
          {columns.map((column, index) => (
            column.visible !== false && <th key={index}>{column.title}</th>
          ))}
        </tr>
      </thead>
    </DataTable>
  );
}

export default Datatables;
