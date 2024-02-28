const { PrismaClient } = require("@prisma/client")
const {
    users,
    customers,
    invoices,
    revenue,
} = require('./placeholder.ts')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient

const seedUsers = async (prismaCl) => {
    const prisma = prismaCl
    try {
        const InsertedUsers = await Promise.all(
            users.map(async (user) => {
                let hashedPassword = await bcrypt.hash(user.password, 10)
                await prisma.User.create({
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        password: hashedPassword
                    }
                })
            })
        )
        return {
            users: InsertedUsers
        }
    } catch (err) {
        console.log(`Ошибка - `, err)
    }
}

const seedCustomers = async (prismaCl) => {
    const prisma = prismaCl
    try {
        const insertedCustomers = await Promise.all(
            customers.map(async (customer) => {
                await prisma.customers.create({
                    data: {
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                        image_url: customer.image_url
                    }
                })
            })
        )
        return {
            customers: insertedCustomers
        }
    } catch (err) {
        console.log(`Customers error - ${err}`)
    }
}


const seedInvoices = async (prismaCl) => {
    const prisma = prismaCl
    try {
        const insertedInvoices = await Promise.all(
            invoices.map(async (invoice) => {
                await prisma.invoices.create({
                    data: {
                        customer_id: invoice.customer_id,
                        amount: invoice.amount,
                        status: invoice.status,
                        date: invoice.date
                    } //Gay shit nigger date format
                })
            })
        )
        return {
            invoices: insertedInvoices
        }
    } catch (err) {
        console.log(`Invoices error - ${err}`)
    }
}

const seedRevenue = async (prismaCl) => {
    const prisma = prismaCl
    try {
        const insertedRevenue = await Promise.all(
            revenue.map(async (revenue) => {
                await prisma.revenue.create({
                    data: {
                        month: revenue.month,
                        revenue: revenue.revenue
                    }
                })
            })
        )
        return {
            revenue: insertedRevenue
        }
    } catch (err) {
        console.log(`Revenue Error - ${err}`)
    }
}


async function main() {
    const prisma = new PrismaClient

    await seedUsers(prisma)
    await seedCustomers(prisma),
    await seedInvoices(prisma),
    await seedRevenue(prisma)
}

main()
    .then(async () => {
        console.log(`Seeded`)
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })