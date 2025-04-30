import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useTranslations } from '@/hooks/use-translations';
import { StatsLayout } from '@/layouts/StatsLayout';

interface dataProps {
    data: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stats',
        href: '/stats',
    },
];

export default function Stats({data}:dataProps) {
    const { t } = useTranslations();

    console.log(data);
    return (
        <StatsLayout title={t('ui.stats.title')}>
            <p>Potato</p>
        </StatsLayout>
    );
}
