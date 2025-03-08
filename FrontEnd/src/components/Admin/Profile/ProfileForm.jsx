import InputField from './InputField';
import DropdownField from './DropdownField';
import Button from './Button';

const formFields = [
  { label: 'First Name', placeholder: 'Enter your first name' },
  { label: 'Last Name', placeholder: 'Enter your last name' },
  { label: 'Your email', placeholder: 'Enter your email' },
  { label: 'Phone Number', placeholder: 'Enter your phone number' },
];

const ProfileForm = () => {
  return (
    <form className="flex flex-col text-sm rounded-none">
      <div className="flex flex-col justify-center items-center px-20 py-16 w-full bg-white rounded-2xl border-zinc-400 shadow-[6px_6px_54px_rgba(0,0,0,0.029)] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full max-w-[780px] max-md:max-w-full">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d475359af3d88d5e60d640e67fc5e975bba6b6ba11735f2424c0ec045ede36f?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" alt="" className="object-contain self-center w-20 aspect-square" />
          <label htmlFor="photoUpload" className="self-center mt-4 font-semibold tracking-wide leading-none text-blue-500 cursor-pointer">
            Upload Photo
            <input id="photoUpload" type="file" accept="image/*" className="sr-only" />
          </label>
          <div className="flex flex-wrap gap-10 mt-10 max-md:max-w-full">
            {formFields.slice(0, 2).map((field, index) => (
              <InputField key={index} label={field.label} placeholder={field.placeholder} />
            ))}
          </div>
          <div className="flex flex-wrap gap-10 mt-16 max-md:mt-10 max-md:max-w-full">
            {formFields.slice(2).map((field, index) => (
              <InputField key={index} label={field.label} placeholder={field.placeholder} />
            ))}
          </div>
          <div className="flex flex-wrap gap-10 mt-12 max-w-full whitespace-nowrap w-[597px] max-md:mt-10">
            <InputField label="Position" placeholder="CEO" />
            <DropdownField label="Gender" options={['Male', 'Female', 'Other']} />
          </div>
          <Button text="Add Now" />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;