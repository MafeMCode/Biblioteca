import { createActionsColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Loan, useDeleteLoan, useLoans } from '@/hooks/loans/useLoans';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, PlusIcon, TrashIcon, TriangleAlert } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function LoansIndex() {
    const { t } = useTranslations();
    const { url } = usePage();

    // Obtener los parámetros de la URL actual
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const pageParam = urlParams.get('page');
    const perPageParam = urlParams.get('per_page');

    // Inicializar el estado con los valores de la URL o los valores predeterminados
    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
    const [filters, setFilters] = useState<Record<string, any>>({});
    // Combine name and email filters into a single search string if they exist
    const combinedSearch = [
        filters.email ? filters.email : 'null',
        filters.book ? filters.book : 'null',
        // filters.capacity ? filters.capacity : 'null',
        // filters.genre ? filters.genre : 'null',
        // filters.floor ? filters.floor : 'null',
    ];

    const {
        data: loans,
        isLoading,
        isError,
        refetch,
    } = useLoans({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteLoanMutation = useDeleteLoan();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteLoan = async (id: string) => {
        try {
            await deleteLoanMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.loans.deleted_error') || 'Error deleting loan');
            console.error('Error deleting loan:', error);
        }
    };

    const columns = useMemo(
        () =>
            [
                createTextColumn<Loan>({
                    id: 'title',
                    header: t('Book Title') || 'Book',
                    accessorKey: 'title',
                }),
                createTextColumn<Loan>({
                    id: 'email',
                    header: t('User Email') || 'Email',
                    accessorKey: 'email',
                }),
                createTextColumn<Loan>({
                    id: 'is_active',
                    header: t('Loan Status') || 'Status',
                    accessorKey: 'is_active',
                    format: (value) => {
                        return value ? 'Finished' : 'In progress';
                    },
                }),
                createTextColumn<Loan>({
                    id: 'created_at',
                    header: t('Starting date') || 'Created At',
                    accessorKey: 'created_at',
                }),
                createTextColumn<Loan>({
                    id: 'days_between',
                    header: t('Remaining') || 'Created At',
                    accessorKey: 'days_between',
                    format: (value) => {
                        const overdue = parseInt(value) < 0;
                        const followup = overdue ? t('overdue') : t('remaining');

                        return (
                            <span className={`flex items-center gap-1 ${overdue ? 'text-red-500' : ''}`}>
                                {value} {t('days')} {followup}
                                {overdue && <TriangleAlert className="text-yellow-500" />}
                            </span>
                        );
                    },
                }),
                createTextColumn<Loan>({
                    id: 'due_date',
                    header: t('Due Date') || 'Due Date',
                    accessorKey: 'due_date',
                }),
                createActionsColumn<Loan>({
                    id: 'actions',
                    header: t('ui.loans.columns.actions') || 'Actions',
                    renderActions: (loan) => (
                        <>
                            <Link href={`/loans/${loan.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                <Button variant="outline" size="icon" title={t('ui.loans.buttons.edit') || 'Edit loan'}>
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                            </Link>
                            <DeleteDialog
                                id={loan.id}
                                onDelete={handleDeleteLoan}
                                title={t('ui.loans.delete.title') || 'Delete loan'}
                                description={
                                    t('ui.loans.delete.description') || 'Are you sure you want to delete this loan? This action cannot be undone.'
                                }
                                trigger={
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        title={t('ui.users.buttons.delete') || 'Delete user'}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </>
                    ),
                }),
            ] as ColumnDef<Loan>[],
        [t, handleDeleteLoan],
    );

    return (
        <LoanLayout title={t('ui.loans.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.loans.title')}</h1>
                        <Link href="/loans/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.loans.buttons.new')}
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <FiltersTable
                            filters={
                                [
                                    /*
                                        filters.number ? filters.story : "null",
                                        filters.capacity ? filters.capacity : "null",
                                        filters.genre ? filters.genre : "null",
                                        filters.floor ? filters.floor : "null",
                                    */
                                    {
                                        id: 'email',
                                        label: t('ui.loans.filters.email') || 'Email',
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.email') || 'Email...',
                                    },
                                    {
                                        id: 'book',
                                        label: t('ui.loans.filters.book') || 'Book',
                                        type: 'text',
                                        placeholder: t('ui.loans.placeholders.book') || 'Book...',
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={setFilters}
                            initialValues={filters}
                        />
                    </div>

                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={10} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.loans.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.loans.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        loans ?? {
                                            data: [],
                                            meta: {
                                                current_page: 1,
                                                from: 0,
                                                last_page: 1,
                                                per_page: perPage,
                                                to: 0,
                                                total: 0,
                                            },
                                        }
                                    }
                                    columns={columns}
                                    onPageChange={handlePageChange}
                                    onPerPageChange={handlePerPageChange}
                                    perPageOptions={[10, 25, 50, 100]}
                                    noResultsMessage={t('ui.loans.no_results') || 'No loans found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LoanLayout>
    );
}
