import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

interface FlashMessages {
    success?: string;
    error?: string;
}

interface PageProps {
    flash: FlashMessages;
    [key: string]: unknown;
}

interface FloorLayout extends PropsWithChildren {
    title: string;
}

export function FloorLayout({ title, children }: FloorLayout) {
    const { t } = useTranslations();
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: t('ui.floors.title'),
            href: '/floors',
        },
    ];

    if (title !== t('ui.floors.title')) {
        breadcrumbs.push({
            title,
            href: '#',
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            {children}
        </AppLayout>
    );
}
