import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const transactions = await prisma.transaction.findMany();
    return Response.json({ transactions })
}

export async function POST(request: Request) {
    const { transaction } = await request.json()
    const transactionId = await prisma.transaction.create({
        data: {
            type: transaction.type,
            amount: transaction.amount,
            currency: transaction.currency,
            status: transaction.status,
            mobileMoneyProvider: transaction.mobileMoneyProvider,
            reference: transaction.reference
        }
    })
    console.log(transactionId, 'created')

    return Response.json(transactionId)
}