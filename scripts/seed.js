const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedTypes(client) {
  try {
    await client.sql`
    CREATE OR REPLACE TYPE  status AS ENUM ('ACTIVE', 'INACTIVE');
    CREATE OR REPLACE TYPE  role AS ENUM ('ADMIN', 'USER', 'ANONYMOUS');
    `;
  } catch (err) {
    console.warn('Error seeding types:', err);
    throw err;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    // await client.sql`
    //   DROP TYPE IF EXISTS status;
    //   DROP TYPE IF EXISTS role;
    // `
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email_address TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        user_status status,
        user_role role,
        created_by VARCHAR(255) NOT NULL DEFAULT 'SYSTEM',
        created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (username, email_address, password, user_status, user_role, created_by, created_date)
        VALUES (${user.username}, ${user.emailAddress}, ${hashedPassword}, ${user.status}, ${user.role}, ${user.createdBy}, ${user.createdDate})
        ON CONFLICT (user_id) DO NOTHING;
      `;
      })
    );

    console.log(`${insertedUsers}`);
    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function removeTable(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const removeTable = await client.sql`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS invoices;
    DROP TABLE IF EXISTS revenue;
    `;

    return {
      removeTable,
    };
  } catch (error) {
    console.error('Error seeding removeTable:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedCustomers(client);
  // await seedInvoices(client);
  // await seedRevenue(client);
  // await seedTypes(client);
  await seedUsers(client);
  // await removeTable(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
