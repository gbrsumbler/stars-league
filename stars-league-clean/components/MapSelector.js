import { maps } from '../data/maps';

export default function MapSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {maps.map((map) => (
        <button
          key={map.name}
          onClick={() => onSelect(map.name)}
          className="p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          <img src={map.image} alt={map.name} className="w-full h-32 object-cover mb-2 rounded" />
          <span>{map.name}</span>
        </button>
      ))}
    </div>
  );
}
