export const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "sports":
      return "bg-blue-100 text-blue-800";
    case "technologies":
      return "bg-purple-100 text-purple-800";
    case "crypto":
      return "bg-yellow-100 text-yellow-800";
    case "finance":
      return "bg-green-100 text-green-800";
    case "ekonomi":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
