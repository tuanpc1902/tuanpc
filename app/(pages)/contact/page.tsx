import { Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { getUser } from '~alias~/app/lib/data';
import { User } from '~alias~/app/lib/definitions';
import Search from './search';
import { sql } from '@vercel/postgres';

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  const search = searchParams.q ?? '';
  const result = await sql`
    SELECT user_id, username, email_address 
    FROM users 
    WHERE email_address ILIKE ${'%' + search + '%'};
  `;
  const users: User[] = result.rows as User[];

  return (
    <>
      <Search />
      <ul>
        {users.map((u) => {
          return (
            <>
              <li key={u.username}>{u.user_id}</li>
              <li key={u.username}>{u.username}</li>
              <li key={u.username}>{u.email_address}</li>
              <br />
              <br />
            </>
          );
        })}
      </ul>
    </>
  );
};
export default ProfilePage;
