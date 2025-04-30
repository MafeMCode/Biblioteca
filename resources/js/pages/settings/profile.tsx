import HeadingSmall from '@/components/heading-small';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Book, ClipboardList, ClockAlertIcon, Frown, ListCheckIcon, Smile } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Timeline from '../users/components/Timeline';

interface ActivityHistoryItem {
    title: string | null;
    ISBN: string | null;
    isActive: boolean;
    returnedAt: string | null;
    dueDate: string | null;
    createdAt: string | null;
    overdue: boolean;
    author: string | null;
    imgURL: string | null;
    type: string; // loan - reservation
}

interface ProfileProps {
    activityHistory: ActivityHistoryItem[];
}

export default function Profile({ activityHistory }: ProfileProps) {
    const { t } = useTranslations();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="mx-auto flex w-4/5 flex-col items-center space-y-6">
                    <Timeline activityList={activityHistory}/>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
