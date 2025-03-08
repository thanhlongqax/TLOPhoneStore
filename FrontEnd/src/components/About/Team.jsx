import TeamMember from './TeamMember';

function Team() {
  const teamMembers = [
    {
      image: "/About/TeamMember/1.png",
      name: "Tom Cruise",
      role: "Founder & Chairman",
      socialLinks: [
        { platform: "Twitter", icon: "/About/twitter.svg", url: "#" },
        { platform: "Instagram", icon: "/About/instagram.svg", url: "#" },
        { platform: "LinkedIn", icon: "/About/Linkedin.svg", url: "#" }
      ]
    },
    {
      image: "/About/TeamMember/2.png",
      name: "Emma Watson",
      role: "Managing Director",
      socialLinks: [
        { platform: "Twitter", icon: "/About/twitter.svg", url: "#" },
        { platform: "Instagram", icon: "/About/instagram.svg", url: "#" },
        { platform: "LinkedIn", icon: "/About/Linkedin.svg", url: "#" }
      ]
    },
    {
      image: "/About/TeamMember/3.png",
      name: "Will Smith",
      role: "Product Designer",
      socialLinks: [
        { platform: "Twitter", icon: "/About/twitter.svg", url: "#" },
        { platform: "Instagram", icon: "/About/instagram.svg", url: "#" },
        { platform: "LinkedIn", icon: "/About/Linkedin.svg", url: "#" }
      ]
    }
  ];

  return (
    <section className="mt-36 max-md:mt-10">
      <div className="flex flex-wrap gap-8 items-start">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
      <div className="flex gap-3 items-center self-center mt-10">
        <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-black bg-opacity-30 fill-black" />
        <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-black bg-opacity-30 fill-black" />
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/92b177d4489b789ca67cd5f3caa2fe9bf63df0a7d703e2d52fb18370f3559c3c?placeholderIfAbsent=true&apiKey=ff55e731257142049b70662432148db0" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
        <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-black bg-opacity-30 fill-black" />
        <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-black bg-opacity-30 fill-black" />
      </div>
    </section>
  );
}

export default Team;