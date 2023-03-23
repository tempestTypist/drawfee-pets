import React from "react";

const TableHead = ({ item }) => {
    return (
        <th title={item}>
            {item}
        </th>
    );
};

export default TableHead;