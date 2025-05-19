import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/use-translations';
import { UserLayout } from '@/layouts/users/UserLayout';
import Timeline from '@/pages/users/components/Timeline';
import 'react-vertical-timeline-component/style.min.css';

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
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center space-y-6 px-4 mt-10">
                <Card className="w-full p-4 text-center text-xl shadow-lg sm:w-3/4 md:w-2/4 lg:w-1/4 dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                </Card>
                <Timeline activityList={activityList} />
            </div>
        </UserLayout>
    );
}
