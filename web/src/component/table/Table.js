import { Table as TableAnt } from 'antd';
import PropTypes from 'prop-types';

const Table = (props) => {
    const { data, columns, totalItem, pageSize, onChangePage, currentPage } = props;

    return (
        <>
            <TableAnt
                dataSource={data}
                rowKey="_id"
                columns={columns}
                pagination={{ defaultCurrent: 1, current: currentPage, total: totalItem, pageSize: pageSize, onChange: onChangePage }}
            >
            </TableAnt>
        </>
    )
};

Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    totalItem: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    onChangePage: PropTypes.func
};

Table.defaultProps = {
    data: [],
    columns: [],
    totalItem: 0,
    pageSize: 10,
    currentPage: 1,
    onChangePage: null
};


export default Table;