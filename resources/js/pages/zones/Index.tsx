import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

interface Floor {
    id: number;
    story: string;
    capacity: number;
    count: number;
}

interface IndexFloorProps extends PageProps {
    floors: Floor[];
}

export default function FloorsIndex({ floors}: IndexFloorProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    return (
        <ZoneLayout title={t('ui.zones.title')}>
        </ZoneLayout>
    );
}
