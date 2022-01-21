import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReadLogListScreen from '../screen/readlog';
import CreateReadLogScreen from '../screen/readlog/CreateLog';
import EditReadLogScreen from '../screen/readlog/EditLog';
import NotFoundScreen from '../screen/404';

const CustomRoutes = () => {
    return (
        <Routes>
            <Route exact element={<ReadLogListScreen />} path="/" />
            <Route exact element={<CreateReadLogScreen />} path="/create" />
            <Route exact element={<EditReadLogScreen />} path="/:id" />
            <Route element={<NotFoundScreen />} path="*" />
        </Routes>
    );
};

export default CustomRoutes;