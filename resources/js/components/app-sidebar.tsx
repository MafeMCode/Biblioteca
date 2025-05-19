import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookMarked,
    BookOpen,
    ChartColumnStacked,
    ChartNoAxesCombined,
    ClipboardList,
    Folder,
    Handshake,
    LandPlot,
    Layers,
    LayoutGrid,
    PersonStanding,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

interface PageProps {
    auth: {
        user: any;
        permissions: string[];
    };
}
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
    const page = usePage<{ props: PageProps }>();
    const auth = page.props.auth;

    const myNavItems = (t: (key: string) => string): NavItem[] => {
        const items: NavItem[] = [];

        // Always add this
        items.push({
            title: t('ui.navigation.items.dashboard'),
            url: '/dashboard',
            icon: LayoutGrid,
        });

        // Conditionally add items
        if (auth.permissions.includes('users.view')) {
            items.push({
                title: t('ui.navigation.items.users'),
                url: '/users',
                icon: Users,
            });
        }

        if (auth.permissions.includes('reports.view')) {
            items.push(
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
                },)
        }


        if (auth.permissions.includes('products.view')) {
            items.push({
                title: t('ui.navigation.items.books'),
                url: '/books',
                icon: BookMarked,
            });
        }
        if (auth.permissions.includes('reports.view')) {
            items.push(

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
            );

        }

        items.push({
            title: t('ui.navigation.items.userUI'),
            url: '/userUI',
            icon: PersonStanding,
        });
        return items;
    };
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
                <NavMain items={myNavItems(t)} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
