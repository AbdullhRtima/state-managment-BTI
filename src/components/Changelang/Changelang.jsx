import React, { useCallback } from 'react'
import { Select } from 'antd';
import { changeLanguage } from 'i18next';
import { setDataLocalStorage } from '../../utils/helpers/localStorageHelper';

// constants
const { Option } = Select;

const Changelang = () => {

    const handleChangeLanguage = useCallback((value) => {
        changeLanguage(value);
        setDataLocalStorage('language', value);
    }, []);

    return (
        <Select defaultValue="English" style={{ width: 120 }} onChange={handleChangeLanguage}>
            <Option value="ar">Arabic</Option>
            <Option value="en">English</Option>
        </Select>
    )
}

export default Changelang;