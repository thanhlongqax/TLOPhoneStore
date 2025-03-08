import PropTypes from 'prop-types';
function FormInput({ label, type ,placeholder ,name , onChange ,value}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col mt-10 w-full">
      <label htmlFor={id} className="text-base text-black opacity-40">
        {label}
      </label>
      <div className="flex flex-col mt-2 w-full">
        <input
          type={type}
          id={id}
          name={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required
        />
      </div>
    </div>
  );
}
FormInput.propTypes = {
  label: PropTypes.string.isRequired, 
  type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default FormInput;
