import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    BookMarked,
    ChartColumnStacked,
    ChartNoAxesCombined,
    ClipboardListIcon,
    Handshake,
    LandPlot,
    Layers,
    PersonStanding,
    Users,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageProps {
    auth: {
        user: any;
        permissions: string[];
    };
}

export default function Dashboard() {
    const { t } = useTranslations();
    const page = usePage<{ props: PageProps }>();
    const auth = page.props.auth;
    console.log(auth.permissions);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {auth.permissions.includes('users.view') && (
                    <DashboardCard title={t('ui.dashboard.users')} description={t('ui.dashboard.description.users')} href="/users" icon={Users} />
                )}
                {auth.permissions.includes('reports.view') && (
                    <DashboardCard title={t('ui.dashboard.floors')} description={t('ui.dashboard.description.floors')} href="/floors" icon={Layers} />
                )}
                {auth.permissions.includes('reports.view') && (
                    <DashboardCard title={t('ui.dashboard.zones')} description={t('ui.dashboard.description.zones')} href="/zones" icon={LandPlot} />
                )}
                {auth.permissions.includes('reports.view') && (
                    <DashboardCard
                        title={t('ui.dashboard.bookcases')}
                        description={t('ui.dashboard.description.bookcases')}
                        href="/bookcases"
                        icon={ChartColumnStacked}
                    />
                )}
                {auth.permissions.includes('products.view') && (
                    <DashboardCard
                        title={t('ui.dashboard.books')}
                        description={t('ui.dashboard.description.books')}
                        href="/books"
                        icon={BookMarked}
                    />
                )}
                {auth.permissions.includes('reports.view') && (
                    <DashboardCard title={t('ui.dashboard.loans')} description={t('ui.dashboard.description.loans')} href="/loans" icon={Handshake} />
                )}
                {auth.permissions.includes('reports.view') && (
                    <DashboardCard
                        title={t('ui.dashboard.reservations')}
                        description={t('ui.dashboard.description.reservations')}
                        href="/reservations"
                        icon={ClipboardListIcon}
                    />
                )}
                {auth.permissions.includes('reports.view') && (
                    <DashboardCard
                        title={t('ui.dashboard.stats')}
                        description={t('ui.dashboard.description.stats')}
                        href="/stats"
                        icon={ChartNoAxesCombined}
                    />
                )}
                <DashboardCard
                    title={t('ui.dashboard.userUI')}
                    description={t('ui.dashboard.description.userUI')}
                    href="/userUI"
                    icon={PersonStanding}
                />
            </div>
        </AppLayout>
    );
}
