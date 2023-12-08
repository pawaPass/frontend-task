'use client';

import {useEffect, useState} from "react";

interface HeadlineProps {
    secondary?: boolean;
    menu?: boolean;
    text: string;
    className?: string;
    ending?: string;
}

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

const testSavingsAccountTransactions: Transaction[] = [
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

function TransactionRow({ transaction, accountType }: { transaction: Transaction; accountType: AccountType }) {
    const isDeposit = transaction.type === TransactionType.DEPOSIT

    const date = new Date(transaction.createdAt).toLocaleDateString('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    return (
        <>
            <div className="flex w-full flex-row items-center justify-between py-2">
                <div className="flex flex-col">
                    <p className="text-sm text-off-black">{transaction.reference}</p>
                    <p className="text-sm text-blue-gray">{date}</p>
                </div>
                <div className="flex flex-row items-center gap-1.5">
                    <p className={`text-lg font-semibold ${isDeposit ? 'text-green-500' : 'text-red-700'}`}>
                        {isDeposit ? '+' : '-'}
                        {transaction.amount}
                    </p>
                    <p className="text-lg font-extralight">{transaction.currency}</p>
                </div>
            </div>
            <div className="h-[1px] w-full bg-blue-gray"></div>
        </>
    );
}

function TransactionHistory({ accountType }: { accountType: AccountType }) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newTransaction, setNewTransaction] = useState(
        {
            type: '' as TransactionType,
            status: '' as TransactionStatus,
            amount: '',
            currency: '',
            mobileMoneyProvider: '',
            reference: '',
        });

    const [errors, setErrors] = useState({
        type: '',
        status: '',
        amount: '',
        currency: '',
        mobileMoneyProvider: '',
        reference: '',
    });

    // Fetch Transactions
    const fetchTransactions = () => {
        fetch('/transactions-api/api')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTransactions(data.transactions);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Post New Transaction
    const postNewTransaction = async (newTransactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
        try {
            const response = await fetch('/transactions-api/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transaction: newTransactionData }),
            });

            if (!response.ok) {
                throw new Error('Error in posting transaction');
            }

            // Fetch updated transactions after adding new one
            fetchTransactions();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddTransaction = () => {
        if (validateForm()) {
            postNewTransaction(newTransaction);
            setShowModal(false);
            setNewTransaction({
                type: '' as TransactionType,
                status: '' as TransactionStatus,
                amount: '',
                currency: '',
                mobileMoneyProvider: '',
                reference: '',
            }); // Reset form
            setErrors({
                type: '',
                status: '',
                amount: '',
                currency: '',
                mobileMoneyProvider: '',
                reference: '',
            }); // Reset errors
        }
    };

    const handleChange = (field: keyof Transaction, value: string) => {
        setNewTransaction({ ...newTransaction, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { ...errors };
        console.log('here3', newTransaction)
        if (!newTransaction.type) {
            newErrors.type = 'Type is required';
            isValid = false;
        }
        if (!newTransaction.status) {
            newErrors.status = 'Status is required';
            isValid = false;
        }
        if (!newTransaction.amount) {
            newErrors.amount = 'Amount is required';
            isValid = false;
        }
        if (!newTransaction.currency) {
            newErrors.currency = 'Currency is required';
            isValid = false;
        }
        if (!newTransaction.mobileMoneyProvider) {
            newErrors.mobileMoneyProvider = 'mobileMoneyProvider is required';
            isValid = false;
        }
        if (!newTransaction.reference) {
            newErrors.reference = 'reference is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <>
            <Headline text={"Header"} menu />

                <div className="mt-10 flex w-full flex-col items-center justify-center">
                    {!!transactions &&
                        !!transactions?.length &&
                        transactions.map(t => (
                            <TransactionRow key={t.id} transaction={t} accountType={accountType} />
                        ))}
                    {!!transactions && !transactions?.length && <p className="text-center text-blue-gray">No transactions yet</p>}
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
                            value={newTransaction.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                        />
                        {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
                        <input
                            type="text"
                            placeholder="Status"
                            className="w-full p-2 my-2 border rounded"
                            value={newTransaction.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                        />
                        {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
                        <input
                            type="text"
                            placeholder="Amount"
                            className="w-full p-2 my-2 border rounded"
                            value={newTransaction.amount}
                            onChange={(e) => handleChange('amount', e.target.value)}
                        />
                        {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
                        <input
                            type="text"
                            placeholder="Currency"
                            className="w-full p-2 my-2 border rounded"
                            value={newTransaction.currency}
                            onChange={(e) => handleChange('currency', e.target.value)}
                        />
                        {errors.currency && <p className="text-red-500 text-xs">{errors.currency}</p>}
                        <input
                            type="text"
                            placeholder="mobileMoneyProvider"
                            className="w-full p-2 my-2 border rounded"
                            value={newTransaction.mobileMoneyProvider}
                            onChange={(e) => handleChange('mobileMoneyProvider', e.target.value)}
                        />
                        {errors.mobileMoneyProvider && <p className="text-red-500 text-xs">{errors.mobileMoneyProvider}</p>}
                        <input
                            type="text"
                            placeholder="reference"
                            className="w-full p-2 my-2 border rounded"
                            value={newTransaction.reference}
                            onChange={(e) => handleChange('reference', e.target.value)}
                        />
                        {errors.reference && <p className="text-red-500 text-xs">{errors.reference}</p>}
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
