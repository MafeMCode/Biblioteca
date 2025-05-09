import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Users, User, ChartColumnStacked, BookMarked, LandPlot, Layers, Handshake, ClipboardListIcon, ChartNoAxesCombined, PersonStanding } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useTranslations } from '@/hooks/use-translations';
import { Head } from '@inertiajs/react';
import CardFlip from "@/components/ui/card-flip";
import { Icon } from '@/components/icon';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { t } = useTranslations();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                    title={t('ui.dashboard.users')}
                    description={t('ui.dashboard.description.users')}
                    href="/users"
                    icon={Users}
                />

                {/* <CardFlip
                    contentFront={
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={User} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Usuario 1</h3>
                                <p className="text-sm text-muted-foreground">descripcion de usuario</p>
                            </div>
                        </div>
                    }
                    contentBack={
                        <div className="flex w-full h-full items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={User} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">cliente 2</h3>
                                <p className="text-sm text-muted-foreground">descripcion de cliente</p>

                            </div>
                        </div>
                    }
                /> */}

                <DashboardCard
                    title={t('ui.dashboard.floors')}
                    description={t('ui.dashboard.description.floors')}
                    href="/floors"
                    icon={Layers}
                />

                <DashboardCard
                    title={t('ui.dashboard.zones')}
                    description={t('ui.dashboard.description.zones')}
                    href="/zones"
                    icon={LandPlot}
                />

                <DashboardCard
                    title={t('ui.dashboard.bookcases')}
                    description={t('ui.dashboard.description.bookcases')}
                    href="/bookcases"
                    icon={ChartColumnStacked}
                />

                <DashboardCard
                    title={t('ui.dashboard.books')}
                    description={t('ui.dashboard.description.books')}
                    href="/books"
                    icon={BookMarked}
                />

                <DashboardCard
                    title={t('ui.dashboard.loans')}
                    description={t('ui.dashboard.description.loans')}
                    href="/loans"
                    icon={Handshake}
                />

                <DashboardCard
                    title={t('ui.dashboard.reservations')}
                    description={t('ui.dashboard.description.reservations')}
                    href="/reservations"
                    icon={ClipboardListIcon}
                />

                <DashboardCard
                    title={t('ui.dashboard.stats')}
                    description={t('ui.dashboard.description.stats')}
                    href="/stats"
                    icon={ChartNoAxesCombined}
                />

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
