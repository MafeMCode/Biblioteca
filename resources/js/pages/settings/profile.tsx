import HeadingSmall from '@/components/heading-small';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@radix-ui/react-tooltip';
import { Book, ClockAlert, Frown, Smile } from 'lucide-react';

interface LoanHistoryItem {
    title: string | null;
    isActive: boolean;
    returnedAt: string | null;
    dueDate: string | null;
    overdue: boolean;
    author: string | null;
}

interface ProfileProps {
    loanHistory: LoanHistoryItem[];
}

export default function Profile({ loanHistory }: ProfileProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;

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
                    <div className="flex flex-col items-center space-y-6">
                    {/* <ScrollArea className="h-120 w-[full] rounded-md p-4"> */}

                        <div className="text-center">
                            <HeadingSmall
                                title={t('ui.settings.profile.timeline.title')}
                                description={t('ui.settings.profile.timeline.description')}
                            />
                        </div>
                        <div>
                            <Timeline>
                                {loanHistory.map((loan, index) => (
                                    <TimelineItem key={index}>
                                        <TimelineOppositeContent width={500} sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="body1" component="span">
                                                {loan.title ?? t('ui.settings.profile.timeline.unknown')}
                                            </Typography>

                                            <Typography variant="body2">{loan.author}</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot
                                                color={
                                                    loan.overdue && loan.isActive
                                                        ? 'warning'
                                                        : loan.overdue && !loan.isActive
                                                          ? 'error'
                                                          : !loan.overdue && !loan.isActive
                                                            ? 'success'
                                                            : 'info'
                                                }
                                            >
                                                {loan.overdue && !loan.isActive && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Frown />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>{t('ui.settings.profile.timeline.returnedOverdue')}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                                {loan.overdue && loan.isActive && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <ClockAlert />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>{t('ui.settings.profile.timeline.isOverdue')}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                                {!loan.overdue && loan.isActive && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Book />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>{t('ui.settings.profile.timeline.lend')}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                                {!loan.overdue && !loan.isActive && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Smile />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>{t('ui.settings.profile.timeline.isReturned')}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>

                                        <TimelineContent width={180} sx={{ m: 'auto 0' }} align="right" variant="body2">
                                            <Typography>
                                                {loan.isActive
                                                    ? t('ui.settings.profile.timeline.inProgress')
                                                    : t('ui.settings.profile.timeline.returned')}
                                            </Typography>
                                            {loan.returnedAt ?? t('ui.settings.profile.timeline.dueDate') + loan.dueDate}
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </div>
                        {/* </ScrollArea> */}

                    </div>
            </SettingsLayout>
        </AppLayout>
    );
}
