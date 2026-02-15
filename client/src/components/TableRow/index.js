const TableRow = ({ data }) => {

	return (
        <tr>
            {data?.map((item, index) => {
                return <td key={`cell-${index}`}>{item}</td>;
            })}
        </tr>
    );
};

export default TableRow;