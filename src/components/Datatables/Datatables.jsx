import { useEffect,useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import './Datatables.scss'
 

function Datatables({data}) {
  DataTable.use(DT);
  const [tableData, setTableData] = useState([]);
  const columns = [
    {
      data: null,
      render: function (data) {
        return `<a className='dt-link' href='/contacts/${data.id}'>${data.first_name} ${data.last_name}</a>`;
      },
      title: 'Full Name',
    },
    { data: 'job_title' },
    { data: 'company' },
    { data: 'mobile_phone' },
    { data: 'email' },
  ];
 
    useEffect(() => {    
      setTableData(data);
    }, [data]);

    return (
        <DataTable data={tableData}  columns={columns} className="display">
            <thead>
                <tr>
                   
                    <th>Full name</th>
                    <th>Job title</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Mobile phone</th>
                </tr>
            </thead>
        </DataTable>
    );
}
 
export default Datatables;