import '../../css/table-list-class-registed.css'
import {useTable} from "react-table/src";
import React from "react";
import datas from './fakeData.json'
const TableTest = ()=> {

    const data = React.useMemo(() => datas, [])
    const columns = React.useMemo(()=>[
        {
            Header: "Class ID",
            accessor: "classId"
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Ngày ĐK",
            accessor: "createdTime"
        },
        {
            Header: "Kỳ",
            accessor: "semester"
        },
        {
            Header: "Thực hiện",
            accessor: "createdById"
        }
    ] ,[])

    console.log(columns)
    console.log(data)

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow}
        = useTable({columns, data})


    return (
        <div className="table-class-registed-container">
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th  {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row,index)
                    return(
                        <tr key={index} {...row.getRowProps()}>
                            {row.cells.map((cell, index) => (
                                <td key={index} {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )

}
export default TableTest