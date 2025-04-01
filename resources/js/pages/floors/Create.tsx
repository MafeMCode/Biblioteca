import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { Book, Layers } from 'lucide-react';
import { FloorForm } from './components/FloorForm';

interface FloorFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;

    },
    storyList: number[];
}

export default function CreateFloor({storyList} : FloorFormProps) {
    const { t } = useTranslations();

    return (
        <FloorLayout title={t('ui.floors.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Layers color="#2762c2" />
                                {t('ui.floors.cards.create.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.floors.cards.create.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <FloorForm storyList = {storyList}/>
                    </CardContent>
                </Card>
            </div>
        </FloorLayout>
    );
}
