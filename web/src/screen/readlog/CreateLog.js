import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as todoActions from '../../redux/action/readlog';
import Wrapper from '../../component/wrapper/Wrapper';
import Loading from '../../component/loading/Loading';
import FormReadLog from '../../component/form/FormReadLog';
import moment from 'moment';
import { toBase64 } from '../../utils/file';
import Error from '../../component/error/Error';

const CreateLog = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.read_log_info.loading);
    const error = useSelector((state) => state.read_log_info.error);
    const info = useSelector((state) => state.read_log_info.info);
    const [cover, setCover] = useState(null);
    const [created, setCreated] = useState(false);
    const [initValue, setInitValue] = useState({ start_date: moment() });

    useEffect(() => {
        created && setInitValue({ ...initValue, ...info });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info]);

    const onUpload = async (e) => {
        setCover(e.file);
        setInitValue({ ...initValue, cover: { base64: await toBase64(e.file) } });
    };

    const create = async (e) => {
        let data = new FormData();
        data.append("book_name", e.book_name);
        data.append("author", e.author);
        data.append("start_date", e.start_date);
        e.end_date && data.append("end_date", e.end_date);
        cover && data.append("cover", cover);
        await dispatch(todoActions.createReadLog(data));
        setCreated(true);
    };

    return (
        <>
            <Loading show={loading} />
            <Wrapper>

                <div>
                    <h2>บันทึกการอ่าน</h2>
                </div>
                <FormReadLog onFinish={create} onUpload={onUpload} initialValues={initValue} />
                {error && <Error message={error} />}
            </Wrapper>
        </>
    );
};

export default CreateLog;