export const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "sports":
      return "bg-blue-100 text-blue-500";
    case "technologies":
      return "bg-purple-100 text-purple-500";
    case "crypto":
      return "bg-yellow-100 text-yellow-500";
    case "finance":
      return "bg-green-100 text-green-500";
    case "ekonomi":
      return "bg-red-100 text-red-500";
    default:
      return "bg-gray-100 text-gray-500";
  }
};
