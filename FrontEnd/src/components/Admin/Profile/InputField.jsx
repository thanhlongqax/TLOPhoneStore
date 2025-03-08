import PropTypes from 'prop-types';
const InputField = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
      <label className="self-start font-semibold text-zinc-600">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-4 mt-3 rounded border border-solid bg-slate-100 border-neutral-300 text-neutral-400 max-md:pr-5"
        aria-label={label}
      />
    </div>
  );
};
InputField.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};
export default InputField;