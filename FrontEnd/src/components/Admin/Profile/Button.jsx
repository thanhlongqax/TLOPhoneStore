import PropTypes from 'prop-types';

const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="self-center px-16 py-4 mt-16 max-w-full text-lg font-bold tracking-normal text-center text-white bg-blue-500 rounded-xl bg-blend-normal w-[274px] max-md:px-5 max-md:mt-10"
    >
      {text}
    </button>
  );
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Button;