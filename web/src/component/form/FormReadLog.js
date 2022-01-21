import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, DatePicker, Button, Image, Upload } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import './form.css';

const FormReadLog = (props) => {
    const { initialValues, onFinish, onFinishFailed, onUpload, mode } = props;
    const [form] = Form.useForm();
    const [bookName, setBookName] = useState(null);
    const [author, setAuthor] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            ...initialValues,
            start_date: moment(initialValues?.start_date),
            end_date: initialValues?.end_date ? moment(initialValues?.end_date) : null
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    const validateBookName = (e) => {
        if (mode !== "create") return false;
        let value = e.target.value;
        setBookName(e.target.value);
        if (
            value !== null && value !== "" &&
            author !== null && author !== ""
        ) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    };

    const validateAuthor = (e) => {
        if (mode !== "create") return false;
        let value = e.target.value;
        setAuthor(e.target.value);
        if (
            value !== null && value !== "" &&
            bookName !== null && bookName !== ""
        ) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    };

    return (
        <>
            <div className="section-img">
                {
                    initialValues?.cover ? (
                        <div style={{ marginBottom: "30px" }}>
                            <Image alt='' height={400} src={initialValues?.cover?.base64 ? initialValues?.cover?.base64 : `data:${initialValues?.cover?.mimetype};base64,${initialValues?.cover?.img}`} />
                        </div>
                    ) : (
                        <div style={{ marginBottom: "30px" }}>
                            <Image
                                alt=''
                                src="error"
                                fallback="data:image/png;base64,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"
                            />
                        </div>
                    )

                }
                <Upload
                    name="cover"
                    onChange={onUpload}
                    beforeUpload={() => false}
                    showUploadList={false}
                    multiple={false}
                    maxCount={1}
                >
                    <Button type="primary">เลือกรูปปก</Button>
                </Upload>
            </div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item label="ชื่อหนังสือ" name="book_name" required>
                    <Input type="text" onChange={validateBookName} />
                </Form.Item>
                <Form.Item label="ชื่อผู้เขียน" name="author" required>
                    <Input type="text" onChange={validateAuthor} />
                </Form.Item>
                <Form.Item label="วันที่เริ่มอ่าน" name="start_date" required>
                    <DatePicker allowClear={false} />
                </Form.Item>
                <Form.Item label="วันที่อ่านจบ" name="end_date">
                    <DatePicker />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 100 }} style={{ textAlign: "center" }}>
                    <Button type="" style={{ marginRight: "10px" }}><Link to="/">กลับ</Link></Button>
                    <Button type="primary" htmlType="submit" disabled={!canSubmit && mode === "create"}>บันทึก</Button>
                </Form.Item>
            </Form>

        </>
    )
};

FormReadLog.propTypes = {
    onFinish: PropTypes.func,
    onFinishFailed: PropTypes.func,
    onUpload: PropTypes.func,
    initialValues: PropTypes.object,
    mode: PropTypes.string
};

FormReadLog.defaultProps = {
    onFinish: null,
    onFinishFailed: null,
    onUpload: null,
    initialValues: null,
    mode: "create"
};

export default FormReadLog;