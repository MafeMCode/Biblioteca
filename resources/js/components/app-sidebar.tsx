import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, BookMarked, Layers, LandPlot, ChartColumnStacked, Handshake, ClipboardList, ChartNoAxesCombined, PersonStanding } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.dashboard'),
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: t('ui.navigation.items.users'),
        url: '/users',
        icon: Users,
    },
    {
        title: t('ui.navigation.items.floors'),
        url: '/floors',
        icon: Layers,
    },
    {
        title: t('ui.navigation.items.zones'),
        url: '/zones',
        icon: LandPlot,
    },
    {
        title: t('ui.navigation.items.bookcases'),
        url: '/bookcases',
        icon: ChartColumnStacked,
    },
    {
        title: t('ui.navigation.items.books'),
        url: '/books',
        icon: BookMarked,
    },
    {
        title: t('ui.navigation.items.loans'),
        url: '/loans',
        icon: Handshake,
    },
    {
        title: t('ui.navigation.items.reservations'),
        url: '/reservations',
        icon: ClipboardList,
    },
    {
        title: t('ui.navigation.items.stats'),
        url: '/stats',
        icon: ChartNoAxesCombined,
    },
    {
        title: t('ui.navigation.items.userUI'),
        url: '/userUI',
        icon: PersonStanding,
    },
];

const footerNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.repository'),
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: t('ui.navigation.items.documentation'),
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { t } = useTranslations();
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(t)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems(t)} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
