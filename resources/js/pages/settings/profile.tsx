import HeadingSmall from '@/components/heading-small';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Book, ClockAlertIcon, Frown, Smile } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface LoanHistoryItem {
    title: string | null;
    ISBN: string | null;
    isActive: boolean;
    returnedAt: string | null;
    dueDate: string | null;
    overdue: boolean;
    author: string | null;
    imgURL: string | null;
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
            <div className="flex flex-col items-center space-y-6 w-4/5 mx-auto">
            <div className="text-center">
                        <HeadingSmall title={t('ui.settings.profile.timeline.title')} description={t('ui.settings.profile.timeline.description')} />
                    </div>

                        <VerticalTimeline layout={'1-column-left'}>
                            {loanHistory.map((loan, index) => (
                                <VerticalTimelineElement
                                    contentStyle={{
                                        background: 'rgba(255, 255, 255, 0.13)',
                                        color: (loan.overdue && loan.isActive
                                            ? 'rgb(213, 185, 125)'
                                            : loan.overdue && !loan.isActive
                                              ? 'rgb(206, 138, 138)'
                                              : !loan.overdue && !loan.isActive
                                                ? 'rgb(132, 192, 131)'
                                                : 'rgb(135, 193, 198)'),
                                        borderTop:
                                            '7px solid ' +
                                            (loan.overdue && loan.isActive
                                                ? 'rgb(210, 144, 0)'
                                                : loan.overdue && !loan.isActive
                                                  ? 'rgb(210, 0, 0)'
                                                  : !loan.overdue && !loan.isActive
                                                    ? 'rgb(4, 210, 0)'
                                                    : 'rgb(0, 193, 210)'),
                                        borderTopLeftRadius: '0.5rem',
                                        borderTopRightRadius: '0.5rem',
                                    }}
                                    contentArrowStyle={
                                        loan.overdue && loan.isActive
                                            ? { borderRight: '7px solid  rgb(210, 144, 0)' }
                                            : loan.overdue && !loan.isActive
                                              ? { borderRight: '7px solid  rgb(210, 0, 0)' }
                                              : !loan.overdue && !loan.isActive
                                                ? { borderRight: '7px solid  rgb(4, 210, 0)' }
                                                : { borderRight: '7px solid  rgb(0, 193, 210)' }
                                    }
                                    date=
                                    {
                                        loan.overdue && loan.isActive
                                            ? 'Due date: ' + loan.dueDate + ' Overdue!'
                                            : loan.overdue && !loan.isActive
                                              ? 'Returned at: ' + loan.returnedAt + ' Overdue!'
                                              : !loan.overdue && !loan.isActive
                                                ? 'Returned at: ' + loan.returnedAt
                                                : 'Due date: ' + loan.dueDate
                                    }
                                    iconStyle={
                                        loan.overdue && loan.isActive
                                            ? { background: 'rgb(210, 144, 0)', color: '#fff' }
                                            : loan.overdue && !loan.isActive
                                              ? { background: 'rgb(210, 0, 0)', color: '#fff' }
                                              : !loan.overdue && !loan.isActive
                                                ? { background: 'rgb(4, 210, 0)', color: '#fff' }
                                                : { background: 'rgb(0, 193, 210)', color: '#fff' }
                                    }
                                    icon={
                                        loan.overdue && loan.isActive ? (
                                            <ClockAlertIcon />
                                        ) : loan.overdue && !loan.isActive ? (
                                            <Frown />
                                        ) : !loan.overdue && !loan.isActive ? (
                                            <Smile />
                                        ) : (
                                            <Book />
                                        )
                                    }
                                >
                                    <div className="flex items-center justify-between w-full">
    <div className="w-4/5">
        <h3 className="mb-2 text-3xl font-semibold">{loan.title}</h3>
        <h4 className="mb-4 text-xl text-gray-300">{loan.author}</h4>
        <p className="text-2xl font-medium text-gray-500">ISBN: {loan.ISBN}</p>
    </div>
    <div className="w-1/5 h-full flex items-center justify-center">

        <img src={loan.imgURL} alt="Preview"  />
    </div>
</div>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                        {/* <Timeline>
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
                            </Timeline> */}
                    {/* </ScrollArea> */}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
