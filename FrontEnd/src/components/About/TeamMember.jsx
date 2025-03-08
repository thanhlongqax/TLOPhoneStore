import PropTypes from 'prop-types';
function TeamMember({ image, name, role, socialLinks }) {
  return (
    <div className="flex flex-col min-w-[240px] w-[370px]">
      <div className="flex overflow-hidden flex-col justify-end px-9 pt-10 max-w-full rounded bg-neutral-100 w-[370px] max-md:px-5">
        <img loading="lazy" src={image} alt={`${name} - ${role}`} className="object-contain w-full aspect-[0.6]" />
      </div>
      <div className="flex flex-col self-start mt-8">
        <div className="flex flex-col text-black">
          <h3 className="text-3xl font-medium tracking-widest leading-none">{name}</h3>
          <p className="mt-2 text-base">{role}</p>
        </div>
        <div className="flex gap-4 items-start self-start mt-4">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} aria-label={`${name}'s ${link.platform}`}>
              <img loading="lazy" src={link.icon} alt="" className="object-contain shrink-0 w-6 aspect-square" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
TeamMember.propTypes = {
  image: PropTypes.string.isRequired,                       
  name: PropTypes.string.isRequired,                       
  role: PropTypes.string.isRequired,                      
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,                    
      icon: PropTypes.string.isRequired,                    
      platform: PropTypes.string.isRequired,                
    })
  ).isRequired,                                       
};
export default TeamMember;