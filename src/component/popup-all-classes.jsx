import React from "react";
import {useSortBy, useTable} from "react-table/src";
import testData from './all-class-test.json'
import './popup-all-classes.css'
export const AllClassesPopup = () => {
    const data = React.useMemo(() => testData, [])

    const columns = React.useMemo(() => [
        {Header: "Mã HP", accessor: "courseId"},
        {Header: "Mã lớp", accessor: "id"},
        {Header: "Mã lớp kèm", accessor: "theoryClassId"},
        {Header: "Kì", accessor: row => row.semester + "-" + row.semesterType},
        {Header: "Max SV", accessor: "maxStudent"},
        {Header: "Loại lớp", accessor: "classType"}

    ],[])

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow}
        = useTable({columns, data}, useSortBy)

    return (
        <div className="table-all-class-container">
            <table {...getTableProps()} className="table-all-class">
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

