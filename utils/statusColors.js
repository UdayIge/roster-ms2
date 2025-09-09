export const statusClass = (status) => {
  // Map status to Tailwind classes for background + text if needed
  switch(status){
    case 'online': return 'bg-green-100 border-green-400 text-green-800';
  case 'online_booked': return 'bg-green-200 border-green-600 text-green-900';
    case 'offline': return 'bg-orange-100 border-orange-400 text-orange-800';
  case 'offline_booked': return 'bg-orange-200 border-orange-600 text-orange-900';
    case 'online_offline': return 'bg-blue-100 border-blue-400 text-blue-800';
  case 'blocked': return 'bg-red-100 border-red-400 text-red-800';
    case 'available': return 'bg-gray-100 border-gray-300 text-gray-700';
    default: return 'bg-gray-100 border-gray-300 text-gray-700';
  }
};
