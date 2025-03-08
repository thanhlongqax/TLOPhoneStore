import PropTypes from 'prop-types';
const DropdownField = ({ label, options }) => {
  return (
    <div className="flex flex-col">
      <label className="self-start font-semibold text-zinc-600">{label}</label>
      <div className="relative">
        <select
          className="flex gap-5 justify-between items-start p-4 mt-3 rounded border border-solid bg-slate-100 border-neutral-300 text-neutral-400 appearance-none w-full"
          aria-label={label}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5607ef7cf475c21828d2b10d351cb710860f73c5bcde56626af79cfed33c0c06?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" alt="" className="object-contain shrink-0 my-auto w-3 aspect-[1.5]" />
        </div>
      </div>
    </div>
  );
};
DropdownField.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};
export default DropdownField;