import { Segmented } from 'antd';
import styled from 'styled-components';
import Information from '~alias~/app/components/information/information';

const StyledSegmented = styled(Segmented)`
  color: #fff;
  .ant-segmented-item {
    .ant-segmented-item-label {
      &:hover {
        color: #fff;
      }
    }
  }
`;

const HomePage = () => {
  return (
    <>
      <Information />
      <StyledSegmented<string>
        className="text-white p-[1rem]"
        options={['Profile', 'Project', 'About', 'Contact', 'Others']}
        onChange={(value) => {
          console.log(value); // string
        }}
        defaultChecked={true}
      />
      {/* <WrapperSession sessionName="Projects" />
      <WrapperSession sessionName="About" />
      <WrapperSession sessionName="Contact" /> */}
    </>
  );
};
export default HomePage;
