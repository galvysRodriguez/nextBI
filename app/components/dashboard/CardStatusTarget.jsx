
export function CardStatusTarget({value, total, title, color}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <span className="text-sm font-semibold ">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`} 
          style={{
            width: `${(value / total) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
