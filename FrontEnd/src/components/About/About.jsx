import OurStory from './OurStory';
import Stats from './Stats';
import Team from './Team';
import Services from './Services';

function About() {
  return (
    <main className="flex flex-col items-start self-end mt-2 w-full max-w-[1305px] max-md:mt-2 max-md:max-w-full">
      <OurStory />
      <Stats />
      <Team />
      <Services />
    </main>
  );
}

export default About;