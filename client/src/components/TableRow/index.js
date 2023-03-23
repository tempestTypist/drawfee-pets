import React from "react";

const TableRow = ({ data }) => {
console.log(data)
    return (
        <tr>
            {data?.map((item) => {
                return <td key={item}>{item}</td>;
            })}
        </tr>
    );
};

export default TableRow;