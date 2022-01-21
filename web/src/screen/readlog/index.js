import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image } from 'antd';
import * as todoActions from '../../redux/action/readlog';
import Loading from '../../component/loading/Loading';
import Table from '../../component/table/Table';
import Wrapper from '../../component/wrapper/Wrapper';
import './index.css';
import Error from '../../component/error/Error';

const SIZE = 10;
const ReadLogList = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.read_log_list.loading);
    const error = useSelector((state) => state.read_log_list.error);
    const logs = useSelector((state) => state.read_log_list.logs);
    const totalItem = useSelector((state) => state.read_log_list.total_item);
    const totalPage = useSelector((state) => state.read_log_list.total_page);
    const [logList, setLogList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(todoActions.getReadLogs(`?page=1&size=${SIZE}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLogList(logs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logs]);

    useEffect(() => {
        if (currentPage > totalPage) {
            dispatch(todoActions.getReadLogs(`?page=1&size=${SIZE}`));
            setCurrentPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPage]);

    const onChangePage = (page) => {
        setCurrentPage(page);
        dispatch(todoActions.getReadLogs(`?page=${page}&size=${SIZE}`));
    };

    const deleteLog = async (id) => {
        await dispatch(todoActions.deleteReadLog(id));
        dispatch(todoActions.getReadLogs(`?page=${currentPage}&size=${SIZE}`));
    };


    const columns = [
        {
            title: 'รูปปก',
            dataIndex: 'cover',
            key: 'cover',
            align: 'center',
            render: covers => (
                covers.map(cover => (
                    <div key={cover._id}>
                        <Image width="50px" alt='' src={`data:${cover.mimetype};base64,${cover.buffer.toString("base64")}`} />
                    </div>
                ))
            )
        },
        {
            title: 'ชื่อหนังสือ',
            dataIndex: 'book_name',
            key: 'book_name',
        },
        {
            title: 'ผู้เขียน',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'วันที่เริ่มอ่าน',
            dataIndex: 'start_date',
            key: 'start_date',
            render: text => <span>{new Intl.DateTimeFormat("th-TH").format(new Date(text))}</span>
        },
        {
            title: 'วันที่อ่านจบ',
            dataIndex: 'end_date',
            key: 'end_date',
            render: text => <span>{text ? new Intl.DateTimeFormat("th-TH").format(new Date(text)) : "-"}</span>
        },
        {
            title: '',
            key: 'action',
            width: '12%',
            render: (text, record) => (
                <div>
                    <Button style={{ marginRight: "10px" }}>
                        <Link to={`/${record._id}`}>แก้ไข</Link>
                    </Button>
                    <Button type="primary" danger onClick={() => deleteLog(record._id)}>ลบ</Button>
                </div>
            )
        }
    ];

    return (
        <>
            <Loading show={loading} />
            <Wrapper>
                <div><h1>บันทึกการอ่าน</h1></div>
                <div className="wrapper-btn-create">
                    <Button type="primary">
                        <Link to="/create">บันทึกการอ่าน</Link>
                    </Button>
                </div>
                {error && <Error message={error} />}
                <Table data={logList} columns={columns} currentPage={currentPage} onChangePage={onChangePage} totalItem={totalItem} pageSize={SIZE} />
            </Wrapper>
        </>
    )
};
export default ReadLogList;