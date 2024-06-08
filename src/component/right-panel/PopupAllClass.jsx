import React, {useState} from "react";
import {useFilters, useSortBy, useTable} from "react-table/src";
import testData from './all-class-test.json'
import './PopupAllClass.css'
import {FaFilter, FaTimes} from "react-icons/fa";

export const AllClassesPopup = ({onClosePopup}) => {
    const data = React.useMemo(() => testData, [])

    const columns = React.useMemo(() => [
        {Header: "Mã HP", accessor: "courseId"},
        {Header: "Mã lớp", accessor: "id"},
        {Header: "Mã lớp kèm", accessor: "theoryClassId"},
        {Header: "Kì", accessor: row => row.semester + "-" + row.semesterType},
        {Header: "Max SV", accessor: "maxStudent"},
        {Header: "Loại lớp", accessor: "classType"}

    ], [])

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter}
        = useTable({columns, data}, useFilters)

    const [filterInput, setFilterInput] = useState({});

    const handleFilterChange = (columnId, value) => {
        setFilter(columnId, value);
        setFilterInput({...filterInput, [columnId]: value});
    };

    return (
        <div className={"popup"}>
            <button className="close-button" onClick={onClosePopup}><FaTimes/></button>
            <div className="table-container">
                <table {...getTableProps()} className="table">
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th  {...column.getHeaderProps({style: column.style})}>
                                    {column.render("Header")}
                                    <FaFilter
                                        className="filter-icon-header"
                                        style={{marginLeft: '5px', cursor: 'pointer'}}
                                        onClick={() => {
                                            const currentFilter = filterInput[column.id] || '';
                                            const newFilter = prompt(`Enter filter for ${column.Header}`, currentFilter);
                                            if (newFilter !== null) {
                                                handleFilterChange(column.id, newFilter);
                                            }
                                        }}
                                    />
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
        </div>
    )
}

