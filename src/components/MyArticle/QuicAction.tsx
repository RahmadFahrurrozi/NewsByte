import Link from "next/link";
import { Button } from "../ui/button";
import { CheckCircle2, Plus } from "lucide-react";
import { BiErrorAlt } from "react-icons/bi";

const ACTIONS = [
  {
    href: "/dashboard-user/write-article",
    label: "Create New Article",
    icon: <Plus className="w-4 h-4" />,
    backgoundIcon: "bg-foreground/5 text-primary",
  },
  {
    href: "/dashboard-user/my-articles/rejected-articles",
    label: "Rejected Articles",
    icon: <BiErrorAlt className="w-4 h-4" />,
    backgoundIcon: "bg-red-500/10 text-red-500",
  },
  // {
  //   href: "/dashboard-user/my-articles/published-articles",
  //   label: "Published Articles",
  //   icon: <CheckCircle2 className="w-4 h-4" />,
  //   backgoundIcon: "bg-green-500/10 text-green-500",
  // },
];

export default function QuickAction() {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
        Quick Actions
      </h3>
      <div className="flex flex-col gap-2">
        {ACTIONS.map(({ href, label, icon, backgoundIcon }) => (
          <Link href={href} key={label}>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 cursor-pointer border border-dashed p-6"
            >
              <div
                className={`flex items-center justify-center rounded-full w-8 h-8 ${backgoundIcon}`}
              >
                {icon}
              </div>
              <span>{label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
