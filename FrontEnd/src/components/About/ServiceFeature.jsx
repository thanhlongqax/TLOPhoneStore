import PropTypes from 'prop-types';
function ServiceFeature({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center self-stretch my-auto min-w-[240px]">
      <img loading="lazy" src={icon} alt="" className="object-contain w-20 aspect-square" />
      <div className="flex flex-col items-center mt-6">
        <h3 className="text-xl font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm text-center">{description}</p>
      </div>
    </div>
  );
}
ServiceFeature.propTypes = {
  icon: PropTypes.string.isRequired,        
  title: PropTypes.string.isRequired,      
  description: PropTypes.string.isRequired, 
};
export default ServiceFeature;