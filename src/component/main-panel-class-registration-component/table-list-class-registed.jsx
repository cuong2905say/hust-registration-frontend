import '../../css/table-list-class-registed.css'
import {useSortBy, useTable} from "react-table/src";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const TableTest = ({jsonData}) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (rowId, checked) => {
        if (checked) {
            setSelectedRows([...selectedRows, rowId]);
            console.log(selectedRows)
        } else {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
        }
    };

    const data = React.useMemo(() => jsonData, [])
    const columns = React.useMemo(() => [
        {
            Header: "Mã học phần",
            accessor: "class.course.id",
        },
        {
            Header: "Tên học phần",
            accessor: (row) => row.class.course.courseName || row.class.course.courseNameE
        },
        {
            Header: "Cần TN",
            accessor: row => row.class.course.needExperiment ? 'Yes' : '',
            Cell: ({value}) => value ?
                <FontAwesomeIcon icon={faCheck} style={{margin: 'auto', display: 'block'}}/> : null
        },
        {
            Header: "Mã lớp",
            accessor: "classId"
        },
        {
            Header: "Mã lớp Kèm (LT)",
            accessor: "class.theoryClassId"
        },
        {
            Header: "Loại lớp",
            accessor: (row) => {
                switch (row.class.classType) {
                    case 'THEORY_EXERCISE':
                        return 'LT+BT';
                    case 'THEORY':
                        return 'LT';
                    case 'EXERCISE':
                        return 'BT';
                    case 'EXPERIMENT':
                        return 'TN';
                }
            }
        },
        {
            Header: "Ngày ĐK",
            accessor: "createdTime"
        },
        {
            Header: "Trạng thái lớp",
            accessor: "class.status"
        },
        {
            Header: "Kỳ",
            accessor: "semester"
        },
        {
            Header: "Người đăng ký",
            accessor: "createdById"
        },
        {
            Header: '',
            accessor: "sssssssssssssssssssss",
            Cell: row => (<input type={"checkbox"} style={{margin: 'auto', display: 'block'}}
                                 onChange={e => handleCheckboxChange(row.id, e.target.checked)}/>)
        }
    ], [])


    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow}
        = useTable({columns, data}, useSortBy)

    return (
        <div className="table-class-registed-container">
            <table {...getTableProps()} className="table-class-registed">
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th  {...column.getHeaderProps({style: column.style})}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row, index)
                    return (
                        <tr key={index} {...row.getRowProps()}>
                            {row.cells.map((cell, index) => (
                                <td key={index} {...cell.getCellProps({style: cell.column.style})}>
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