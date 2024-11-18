import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorAlert } from '../../utils/alertService';
import { getCash } from '../../stores/slices/cashSlice';
import DisplayPoint from '../Fragments/DisplayPoint';

const Member = () => {
    const dispatch = useDispatch();
    const { cash, bonus, status, error } = useSelector((state) => state.cash);
    const [CashDetails, setCashDetails] = useState({
        cash: null,
        bonus: null,
    });

    useEffect(() => {
        dispatch(getCash());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setCashDetails({
                cash,
                bonus,
            });
        } else if (status === 'failed') {
            showErrorAlert(error);
        }
    }, [status, error, cash, bonus]);

    return (
        <div>
            <h1>Member</h1>
            <div className='grid md:grid-cols-2 md:space-x-4 p-12 border'>
                {CashDetails && Object.entries(CashDetails).map(([key, value], index) => (
                    <DisplayPoint key={index} title={key} value={value?.toString()} />
                ))}
            </div>
        </div>
    );
};

export default Member;
