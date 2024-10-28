import { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import './Datatables.scss';

function Datatables({ data,type }) {
  DataTable.use(DT);
  const [tableData, setTableData] = useState([]);
  const contact_columns = [
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
    { data: 'status', title: 'Status' },
  ];

  const deal_columns = [
    {
      data: null,
      render: function (data) {
        return `<a className='dt-link' href='/deals/${data.id}'>${data.title}</a>`;
      },
      title: 'Title',
    },
    {
      data: null,
      render: function (data) {
        return `${data.contact_first_name} ${data.contact_last_name}`;
      },
      title: 'Contact',
    },
    { data: 'product', title: 'Product' },
    {
      data: null,
      render: function (data) {
        return `$ ${data.amount}`;
      },
      title: 'Amount',
    },
    { data: 'status', title: 'Status' },
  ];

  const columns = type === 'contacts' ? contact_columns : deal_columns;

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const tableOptions = {
    data: tableData,
    columns: type === 'contacts' ? contact_columns : deal_columns,
    responsive: true,
    order: []
  };

  return (
    <>
      <DataTable {...tableOptions} className="display">
        <thead>
          <tr>
            {columns.map((column, index) => (
              column.visible !== false && <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
      </DataTable>
    </>
  );
}

export default Datatables;
