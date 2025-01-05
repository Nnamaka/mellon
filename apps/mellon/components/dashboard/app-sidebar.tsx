"use client";

import * as React from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bot,
  BookOpen,
  Command,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Calender",
      url: "/dashboard/calendar",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Compose",
      url: "/dashboard/compose",
      icon: Bot,
    },
    {
      title: "Library",
      url: "/dashboard/library",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],

  projects: [
    {
      name: "Calender",
      url: "#",
      icon: Frame,
    },
    {
      name: "Compose",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Library",
      url: "#",
      icon: Map,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({
  currentPath,
  ...props
}: React.ComponentProps<typeof Sidebar> & { currentPath: string }) {
  const pathname = usePathname(); // Get the current path
  const router = useRouter(); // Use the next/navigation router for navigation

  useEffect(() => {
    if (pathname === "/dashboard") {
      router.push("/dashboard/calendar"); // Redirect to the default dashboard page
    }
  }, [pathname, router]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mellon</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} currentPath={currentPath} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
