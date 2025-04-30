import HeadingSmall from '@/components/heading-small';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/use-translations';
import { UserLayout } from '@/layouts/users/UserLayout';
import { Book, ClipboardList, ClockAlertIcon, Frown, Smile } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Timeline from '@/pages/users/components/Timeline';

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

interface UserProps {
    activityList: ActivityHistoryItem[];
    user: {
        name: string;
        email: string;
        id: string;
    };
}

export default function CreateUser({ activityList, user }: UserProps) {
    const { t } = useTranslations();

    return (
        <UserLayout title={t('ui.users.show')}>
            <div className="mx-auto flex w-4/5 flex-col items-center space-y-6">
                <Card className="m-4 w-1/4 p-4 text-center text-xl shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                </Card>
                <Timeline activityList={activityList}/>
            </div>
        </UserLayout>
    );
}
