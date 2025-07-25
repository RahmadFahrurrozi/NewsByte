const getBreadcrumbTitle = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  const key = segments.join("/");
  const titles: Record<string, string> = {
    "dashboard-user": "Dashboard",
    "dashboard-user/write-article": "Write Article",
    "dashboard-user/my-articles": "My Articles",
    "dashboard-user/notifications": "Notifications",
    "dashboard-user/settings": "Settings",
    "dashboard-user/settings/general": "General Settings",
    "dashboard-user/settings/security": "Security Settings",
  };

  return titles[key] || "Dashboard";
};

export default getBreadcrumbTitle;
