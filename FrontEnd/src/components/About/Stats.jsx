
import StatCard from './StatCard';

function Stats() {
  const stats = [
    { icon: "/About/Shop.svg", number: "10.5k", description: "Sallers active our site" },
    { icon: "/About/Money.svg", number: "33k", description: "Mopnthly Produduct Sale", isHighlighted: true },
    { icon: "/About/ShoppingBag.svg", number: "45.5k", description: "Customer active in our site" },
    { icon: "/About/MoneyBag.svg", number: "25k", description: "Anual gross sale in our site" }
  ];

  return (
    <div className="flex flex-wrap gap-8 items-start mt-36 text-black max-md:mt-10 max-md:max-w-full">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

export default Stats;