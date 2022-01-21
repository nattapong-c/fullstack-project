import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as todoActions from '../../redux/action/readlog';
import Wrapper from '../../component/wrapper/Wrapper';
import Loading from '../../component/loading/Loading';
import FormReadLog from '../../component/form/FormReadLog';
import { toBase64 } from '../../utils/file';
import Error from '../../component/error/Error';

const EditLog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.read_log_info.loading);
    const error = useSelector((state) => state.read_log_info.error);
    const info = useSelector((state) => state.read_log_info.info);
    const [cover, setCover] = useState(null);
    const [initValue, setInitValue] = useState({});

    useEffect(() => {
        dispatch(todoActions.getReadLog(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setInitValue(info);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info]);

    const update = (e) => {
        let data = new FormData();
        data.append("book_name", e.book_name);
        data.append("author", e.author);
        data.append("start_date", e.start_date);
        e.end_date && data.append("end_date", e.end_date);
        cover && data.append("cover", cover);
        dispatch(todoActions.updateReadLog(id, data));
    };

    const onUpload = async (e) => {
        setCover(e.file);
        setInitValue({ ...initValue, cover: { base64: await toBase64(e.file) } });
    };

    return (
        <>
            <Loading show={loading} />
            <Wrapper>

                <div>
                    <h2>บันทึกการอ่าน</h2>
                </div>
                <FormReadLog onFinish={update} onUpload={onUpload} initialValues={initValue} mode="edit" />
                {error && <Error message={error} />}
            </Wrapper>
        </>
    );
};

export default EditLog;