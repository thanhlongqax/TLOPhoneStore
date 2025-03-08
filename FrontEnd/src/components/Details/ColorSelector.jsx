function ColorSelector() {
  const colors = ['indigo-300', 'red-400'];

  return (
    <div className="flex gap-6 items-start mt-6">
      <span className="text-xl tracking-wide leading-none text-black">Colours:</span>
      <div className="flex gap-2 items-start">
        {colors.map((color, index) => (
          <button key={index} className={`flex shrink-0 w-5 h-5 bg-${color} rounded-full`} aria-label={`Select ${color} color`} />
        ))}
      </div>
    </div>
  );
}

export default ColorSelector;