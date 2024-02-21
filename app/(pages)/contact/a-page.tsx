'use client';
import { User } from '~alias~/app/lib/definitions';
import Search from '../../components/search';
import { uniqueId } from 'lodash';

const ProfilePage = ({ searchParams }: { searchParams: { q: string } }) => {
  // const search = searchParams.q ?? '';
  // const result = await sql`
  //   SELECT user_id, username, email_address
  //   FROM users
  //   WHERE email_address ILIKE ${'%' + search + '%'};
  // `;
  // const users: User[] = result.rows as User[];
  // return (
  //   <>
  //     <Search />
  //     {users.map((u, index) => {
  //       return (
  //         <ul key={uniqueId()}>
  //           <li key={u.username}>{u.user_id}</li>
  //           <li key={u.username}>{u.username}</li>
  //           <li key={u.username}>{u.email_address}</li>
  //           {users.length - 1 !== index ? (
  //             <hr style={{ margin: '10px 0' }} />
  //           ) : null}
  //         </ul>
  //       );
  //     })}
  //   </>
  // );
  return <></>;
};
export default ProfilePage;
