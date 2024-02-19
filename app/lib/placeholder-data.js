const users = [
  {
    username: 'admin',
    email_address: 'admin@vercel.com',
    password: '123',
    status: 'ACTIVE',
    role: 'ADMIN',
    created_by: 'SYSTEM',
    created_date: new Date(),
  },
  {
    username: 'User',
    emailAddress: 'user@vercel.com',
    password: '123456',
    status: 'ACTIVE',
    role: 'USER',
    createdBy: 'SYSTEM',
    createdDate: new Date(),
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
];

// const revenue = [
//   { month: 'Jan', revenue: 2000 },
//   { month: 'Feb', revenue: 1800 },
//   { month: 'Mar', revenue: 2200 },
//   { month: 'Apr', revenue: 2500 },
//   { month: 'May', revenue: 2300 },
//   { month: 'Jun', revenue: 3200 },
//   { month: 'Jul', revenue: 3500 },
//   { month: 'Aug', revenue: 3700 },
//   { month: 'Sep', revenue: 2500 },
//   { month: 'Oct', revenue: 2800 },
//   { month: 'Nov', revenue: 3000 },
//   { month: 'Dec', revenue: 4800 },
// ];

module.exports = {
  users,
  customers,
  revenue,
};
