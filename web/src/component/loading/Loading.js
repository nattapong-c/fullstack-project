import { Spin } from 'antd';
import './loading.css';
import PropTypes from 'prop-types';

const Loading = (props) => {
    const { show } = props;
    return (
        <div className={`loading-wrapper ${show ? 'active' : ''}`}>
            <Spin size='large' spinning={show} />
        </div>
    )
};

Loading.propTypes = {
    show: PropTypes.bool
};

Loading.defaultProps = {
    show: false
};

export default Loading;