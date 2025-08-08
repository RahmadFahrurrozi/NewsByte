const getBadgeColorStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "published":
      return "bg-green-100 text-green-600";
    case "pending":
      return "bg-orange-100 text-orange-600";
    case "rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default getBadgeColorStatus;
