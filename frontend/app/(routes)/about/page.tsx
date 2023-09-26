import { constants } from '@/constants';

const About = () => {
  return (
    <div className="mx-20">
      <h2 className="text-center font-bold text-5xl my-12">About Us</h2>
      <p className="text-2xl">{constants.aboutUs}</p>
    </div>
  );
};

export default About;
