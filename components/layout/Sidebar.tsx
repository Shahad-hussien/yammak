"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  LogOut,
  Map as MapIcon,
  Package,
  Truck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface AppSidebarProps {
  role: string;
}

type NavItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

const NAV_ITEMS: Record<string, NavItem[]> = {
  admin: [
    { title: "Orders", url: "/orders", icon: Package },
    { title: "Summary", url: "/summary", icon: BarChart3 },
  ],
  dispatcher: [
    { title: "Orders", url: "/orders", icon: Package },
    { title: "Map", url: "/map", icon: MapIcon },
  ],
  driver: [
    { title: "Deliveries", url: "/deliveries", icon: Truck },
    { title: "Map", url: "/map", icon: MapIcon },
  ],
};

const AppSidebar = ({ role }: AppSidebarProps) => {
  const router = useRouter();
  const navItems = NAV_ITEMS[role] || NAV_ITEMS[role.toLowerCase()];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                await authClient.signOut();
                router.push("/login");
              }}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive active:bg-destructive/15 active:text-destructive w-full"
            >
              <LogOut className="size-4" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
