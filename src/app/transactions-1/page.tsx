'use client';

import {useState} from "react";

interface HeadlineProps {
    secondary?: boolean;
    menu?: boolean;
    text: string;
    className?: string;
    ending?: string;
}

enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL'
}

enum TransactionStatus {
    CREATED = 'CREATED',
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED'
}

export enum AccountType {
    CHECKING = 'CHECKING',
    SAVINGS = 'SAVINGS'
}

interface Transaction {
    id: number;
    type: TransactionType;
    status: TransactionStatus;
    amount: string;
    currency: string;
    mobileMoneyProvider: string;
    reference: string;
    createdAt: string;
}

const testTransactions: Transaction[] = [
    {
        id: 1,
        type: TransactionType.DEPOSIT,
        status: TransactionStatus.FAILED,
        amount: '12345.69',
        currency: 'RWF',
        mobileMoneyProvider: 'AIRTEL_GHA',
        reference: 'na waciki',
        createdAt: '2023-11-22T11:22:33.444Z'
    },
    {
        id: 2,
        type: TransactionType.WITHDRAWAL,
        status: TransactionStatus.COMPLETED,
        amount: '14.15',
        currency: 'RWF',
        mobileMoneyProvider: 'AIRTEL_GHA',
        reference: 'na lody',
        createdAt: '2023-11-22T11:22:33.444Z'
    }
];

export function Headline({ text, secondary, className = '', ending = '.' }: HeadlineProps) {
    return (
        <div className={`flex w-full justify-between ${className}`}>
            <h1 className={secondary ? 'header-secondary' : 'header-primary'}>
                {text}
                <span className="text-gold">{ending}</span>
            </h1>
        </div>
    );
}


function TransactionRow() {
    return (
        <div>Transaction Row</div>
    );
}

function TransactionHistory({ accountType }: { accountType: AccountType }) {

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({
        type: '',
        status: '',
        amount: '',
        currency: '',
        mobileMoneyProvider: '',
        reference: '',
        createdAt: ''
    });

    const handleChange = (field: keyof Transaction, value: string) => {
        setErrors({ ...errors, [field]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { ...errors };

        setErrors(newErrors);
        return isValid;
    };

    const handleAddTransaction = () => {
        if (validateForm()) {
            setShowModal(false);
            setErrors({
                type: '',
                status: '',
                amount: '',
                currency: '',
                mobileMoneyProvider: '',
                reference: '',
                createdAt: ''
            }); // Reset errors
        }
    };

    return (
        <>
            <Headline text={"Header"} menu />

                <div>
                    <TransactionRow />
                    <button
                        className="self-end mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 w-12 rounded-full"
                        onClick={() => setShowModal(true)}
                    >+
                    </button>
                </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold">Add New Transaction</h3>
                        <input
                            type="text"
                            placeholder="Type"
                            className="w-full p-2 my-2 border rounded"
                            onChange={(e) => handleChange('type', e.target.value)}
                        />
                        {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
                        <input
                            type="text"
                            placeholder="Status"
                            className="w-full p-2 my-2 border rounded"
                            onChange={(e) => handleChange('status', e.target.value)}
                        />
                        {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
                        <input
                            type="text"
                            placeholder="Amount"
                            className="w-full p-2 my-2 border rounded"
                            onChange={(e) => handleChange('amount', e.target.value)}
                        />
                        {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
                        <input
                            type="text"
                            placeholder="Currency"
                            className="w-full p-2 my-2 border rounded"
                            onChange={(e) => handleChange('currency', e.target.value)}
                        />
                        {errors.currency && <p className="text-red-500 text-xs">{errors.currency}</p>}
                        <input
                            type="text"
                            placeholder="mobileMoneyProvider"
                            className="w-full p-2 my-2 border rounded"
                            onChange={(e) => handleChange('mobileMoneyProvider', e.target.value)}
                        />
                        {errors.mobileMoneyProvider && <p className="text-red-500 text-xs">{errors.mobileMoneyProvider}</p>}
                        <input
                            type="text"
                            placeholder="reference"
                            className="w-full p-2 my-2 border rounded"
                            onChange={(e) => handleChange('reference', e.target.value)}
                        />
                        {errors.reference && <p className="text-red-500 text-xs">{errors.reference}</p>}
                        <input
                            type="date"
                            className="w-full p-2 my-2 border rounded"
                            onChange={(e) => handleChange('createdAt', e.target.value)}
                        />
                        {errors.createdAt && <p className="text-red-500 text-xs">{errors.createdAt}</p>}
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddTransaction}
                            >
                                Add Transaction
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TransactionHistory;
