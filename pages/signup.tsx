import type { NextPage } from 'next';

// components
// import Meta from 'components/Meta';
import SigninFormFormik from '../containers/Signup/FormFormik';

const Signup: NextPage = () => {
  return (
    <>
      {/* <Meta
        title="Personal Blog"
        description="Share your idea"
        pathName="/signin"
        thumbnail=""
      /> */}
      <SigninFormFormik />
    </>
  );
};

export default Signup;
