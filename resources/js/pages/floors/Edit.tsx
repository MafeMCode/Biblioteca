import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { FloorForm } from '@/pages/floors/components/FloorForm';
import { Layers } from 'lucide-react';

interface FloorFormProps {
    floor: {
        id: string;
        story: number;
        capacity: number;
    };
}

export default function CreateFloor({floor}:FloorFormProps) {
    const { t } = useTranslations();

    return (
        <FloorLayout title={t('ui.floors.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Layers color="#2762c2" />
                                {t('ui.floors.cards.edit.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.floors.cards.edit.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <FloorForm  initialData={floor}/>
                    </CardContent>
                </Card>
            </div>
        </FloorLayout>
    );
}
