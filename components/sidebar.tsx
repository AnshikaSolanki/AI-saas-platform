"use client";

import Link  from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessagesSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({weight:"600", subsets:["latin"]});

const routes = [
    {
       label: "Dashboard",
       icon: LayoutDashboard,
       href: "/dashboard",
       color: "text-sky-600"
    },
    {
       label: "Conversation",
       icon: MessagesSquare,
       href: "/conversation",
       color: "text-violet-600"
    },
    {
       label: "Image Generation",
       icon: ImageIcon,
       href: "/image",
       color: "text-pink-700"
    },
    {
       label: "Video Generation",
       icon: VideoIcon,
       href: "/video",
       color: "text-orange-700"
    },
    {
       label: "Music Generation",
       icon: Music,
       href: "/music",
       color: "text-emerald-500"
    },
    {
       label: "Code Generation",
       icon: Code,
       href: "/code",
       color: "text-green-700"
    },
    {
       label: "Settings",
       icon: Settings,
       href: "/settings"
    },

];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean
};

const Sidebar = ({
    apiLimitCount = 0,
    isPro=false
}: SidebarProps) => {
    const pathname = usePathname();

    return(
        <div className="space-y-4 py-4 flex flex-col h-full text-white bg-slate-900">
            <div className="px-3 py-2 flex-1">
                <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
                    <div className="relative w-10 h-10 mr-4">
                        <Image 
                            fill 
                            alt="logo"
                            src="/logo.svg"  />
                    </div>
                    <div>
                        <h1 className={cn("text-2xl font-bold", montserrat.className)}>SmartBot</h1>
                    </div>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "text-white bg-white/10":"text-zic-400"
                            )}>
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                            {route.label}
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter 
                apiLimitCount={apiLimitCount}
                isPro={isPro}/>
        </div>

    );
}

export default Sidebar;