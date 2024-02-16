'use client';
import { Table } from 'antd';
import Column from 'antd/es/table/Column';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '~alias~/app/components/spinner/spinner';

const ProfilePage = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,flags')
      .then((country) => {
        let countries: string[] = [];
        country.data?.forEach((cnt: any) => {
          countries.push(cnt.name.common);
        });
        setData(countries.sort());
        setIsLoading(false);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <>
      <Table
        dataSource={data}
        bordered
        scroll={{ y: 500 }}
        style={{ width: 800 }}
        loading={{
          indicator: <Spinner />,
          spinning: isLoading,
          // fullscreen: true,
        }}
      >
        <Column
          title="Country"
          key="common"
          width={100}
          render={(tags: any[]) => <>{tags}</>}
        />
      </Table>
      {/* https://vt.tiktok.com/ZSFjpJpb5/ */}
    </>
  );
};
export default ProfilePage;
