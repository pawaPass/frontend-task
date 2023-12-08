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

function TransactionHistory() {

    return (
        <>
            <Headline text={"Header"} menu />
                <div>
                    <TransactionRow />
                </div>
        </>
    );
}

export default TransactionHistory;
