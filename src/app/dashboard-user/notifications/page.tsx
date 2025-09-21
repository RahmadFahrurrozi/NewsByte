"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Check,
  Trash2,
  Settings,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: number;
  type: "rejected" | "approved" | "pending";
  title: string;
  message: string;
  time: string;
  read: boolean;
  articleId?: number;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string>("all");

  // Simulasi data notifikasi
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: "rejected",
        title: "Article Rejected",
        message:
          "Your article 'The Impact of AI Technology in Modern Education' has been rejected due to content quality issues.",
        time: "2 hours ago",
        read: false,
        articleId: 101,
      },
      {
        id: 2,
        type: "approved",
        title: "Article Approved",
        message:
          "Your article 'Digital Marketing Strategies for SMEs' has been approved and published.",
        time: "1 day ago",
        read: true,
        articleId: 102,
      },
      {
        id: 3,
        type: "rejected",
        title: "Article Rejected",
        message:
          "Your article 'Analysis of Fintech Development' was rejected for plagiarism.",
        time: "3 days ago",
        read: true,
        articleId: 103,
      },
      {
        id: 4,
        type: "approved",
        title: "Article Approved",
        message:
          "Your article 'Hydroponic Plant Cultivation Techniques' has been approved and is now live.",
        time: "1 week ago",
        read: true,
        articleId: 104,
      },
      {
        id: 5,
        type: "pending",
        title: "Article Under Review",
        message:
          "Your article 'Modern Web Development Best Practices' is currently under review by our editors.",
        time: "2 days ago",
        read: true,
        articleId: 105,
      },
      {
        id: 6,
        type: "approved",
        title: "Article Approved",
        message:
          "Your article 'Data Science for Business Intelligence' has been approved and published.",
        time: "3 days ago",
        read: false,
        articleId: 106,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notification) => notification.type === filter);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (type: string) => {
    switch (type) {
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        );
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="px-5 py-4 sm:px-7">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on your article status and platform activities
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("approved")}>
                Approved Articles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("rejected")}>
                Rejected Articles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("pending")}>
                Pending Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Your Notifications</CardTitle>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No notifications
              </h3>
              <p className="text-gray-500 mt-2">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 flex gap-4 ${
                    !notification.read
                      ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
                      : ""
                  } transition-colors duration-200`}
                >
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      {getStatusBadge(notification.type)}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            Mark as read
                          </Button>
                        )}
                        {notification.articleId && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Article
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <span>{unreadCount} unread notifications</span>
        <Button
          variant="link"
          className="text-gray-500"
          onClick={markAllAsRead}
        >
          Mark all as read
        </Button>
      </div>
    </div>
  );
}
