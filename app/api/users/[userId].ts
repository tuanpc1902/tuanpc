// // pages/api/users/[userId].js
// import { sql } from '@vercel/postgres';

// const pool = new sql.Client();

// export default async function handler(req: any, res: any) {
//   const userId = req.query.userId;

//   try {
//     const results = await pool.query('SELECT * FROM users WHERE id = $1', [
//       userId,
//     ]);
//     res.status(200).json(results.rows[0]); // Assuming you're fetching a single user
//   } catch (error) {
//     if (error instanceof VercelPostgresError) {
//       res.status(500).json({ error: error.message });
//     } else {
//       // Handle other types of errors
//       res.status(500).json({ error: 'Server-side error' });
//     }
//   } finally {
//     await pool.end();
//   }
// }
