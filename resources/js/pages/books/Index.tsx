import { createActionsColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Book, useBooks, useDeleteBook } from '@/hooks/books/useBooks';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ClipboardList, CopyIcon, Handshake, Menu, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface Email {
    label: string;
    value: string;
}

interface PageProps {
    auth: {
        user: any;
        permissions: string[];
    };
}
interface BookIndexProps {
    floor_list: number[];
    zone_list: number[];
    bookcase_list: number[];
    emailList: Email[];
}

export default function BooksIndex({ floor_list, zone_list, bookcase_list, emailList }: BookIndexProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    const page = usePage<{ props: PageProps }>();
    const auth = page.props.auth;
    // Obtener los parámetros de la URL actual
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const pageParam = urlParams.get('page');
    const perPageParam = urlParams.get('per_page');

    // Inicializar el estado con los valores de la URL o los valores predeterminados
    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [open, setOpen] = useState(false);
    const [openClone, setOpenClone] = useState(false);
    const [popOpen, popSetOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [reserMail, setReserMail] = useState('');

    const combinedSearch = [
        filters.title ? filters.title : 'null',
        filters.genres ? filters.genres : 'null',
        filters.author ? filters.author : 'null',
        filters.pages ? filters.pages : 'null',
        filters.publisher ? filters.publisher : 'null',
        filters.floor ? filters.floor : 'null',
        filters.zone ? filters.zone : 'null',
        filters.bookcase ? filters.bookcase : 'null',
        filters.ISBN ? filters.ISBN : 'null',
        filters.available ? filters.available : 'null',
    ];

    const {
        data: books,
        isLoading,
        isError,
        refetch,
    } = useBooks({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });

    const deleteBookMutation = useDeleteBook();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    function handleLoanButton(bookID: string) {
        return router.get('/loans/create', { bookID });
    }

    function HandleReservation(bookID: string, userMail: string) {
        const reservationData = new FormData();
        reservationData.append('bookID', bookID);
        reservationData.append('userMail', userMail);

        router.post('/reservations', reservationData);
        // window.location.reload();
    }

    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters !== filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };

    function handleCloneBook(bookID: string, userMail: string) {
        const reservationData = new FormData();
        reservationData.append('bookID', bookID);
        reservationData.append('userMail', userMail);

        router.post('/reservations', reservationData);
        // window.location.reload();
    }

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteBook = async (id: string) => {
        try {
            await deleteBookMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.books.deleted_error') || 'Error deleting book');
            console.error('Error deleting book:', error);
        }
    };

    let columns = useMemo(
        () =>
            [
                createTextColumn<Book>({
                    id: 'title',
                    header: t('ui.books.columns.title') || 'Title',
                    accessorKey: 'title',
                }),
                createTextColumn<Book>({
                    id: 'ISBN',
                    header: t('ISBN') || 'Title',
                    accessorKey: 'ISBN',
                    format: (value) => {
                        return value['number'] + ' - (' + value['loans'] + '/' + value['total'] + ')';
                    },
                }),
                createTextColumn<Book>({
                    id: 'hasActive',
                    header: t('ui.books.utils.available') || 'Title',
                    accessorKey: 'hasActive',
                    format: (value) => {
                        return !value ? t('ui.books.utils.available') : t('ui.books.utils.unavailable');
                    },
                }),
                // createActionsColumn<Book>({
                //     id: 'imgUrl',
                //     header: t('ui.books.columns.image') || 'Image',
                //     accessorKey: 'imgUrl',
                //     renderActions(book) {
                //         return (
                //             <TooltipProvider>
                //                 <Tooltip>
                //                     <TooltipTrigger>
                //                         <Image />
                //                     </TooltipTrigger>
                //                     <TooltipContent>
                //                         {/* Check if URL exists */}
                //                         {book.imgUrl ? (
                //                             <img src={book.imgUrl} alt="Preview" style={{ width: '200px', height: 'auto', marginTop: '10px' }} />
                //                         ) : (
                //                             <span>{book.imgUrl}</span> // Fallback message or image
                //                         )}
                //                     </TooltipContent>
                //                 </Tooltip>
                //             </TooltipProvider>
                //         );
                //     },
                // }),
                createTextColumn<Book>({
                    id: 'genres',
                    header: t('ui.books.columns.genres') || 'Genres',
                    accessorKey: 'genres',
                    format: (value) => {
                        let aux;
                        let res: string[] = [];
                        if (value.includes(',')) {
                            aux = value.split(', ');
                            aux.map((genre) => {
                                genre = t(`ui.genres.names.${genre}`);
                                res.push(genre);
                            });
                            aux = res.join(', ');
                            return aux;
                        } else {
                            return t(`ui.genres.names.${value}`);
                        }
                    },
                }),
                createTextColumn<Book>({
                    id: 'author',
                    header: t('ui.books.columns.author') || 'Author',
                    accessorKey: 'author',
                }),
                createTextColumn<Book>({
                    id: 'length',
                    header: t('ui.books.columns.length') || 'Length',
                    accessorKey: 'length',
                }),
                createTextColumn<Book>({
                    id: 'editor',
                    header: t('ui.books.columns.editor') || 'Editor',
                    accessorKey: 'editor',
                }),
                createTextColumn<Book>({
                    id: 'floor_id',
                    header: t('ui.books.columns.floor') || 'Floor',
                    accessorKey: 'floor_id',
                }),
                createTextColumn<Book>({
                    id: 'zone_id',
                    header: t('ui.books.columns.zone') || 'Zone',
                    accessorKey: 'zone_id',
                }),
                createTextColumn<Book>({
                    id: 'bookcase_id',
                    header: t('ui.books.columns.bookcase') || 'Bookcase',
                    accessorKey: 'bookcase_id',
                }),
                // createDateColumn<Book>({
                //     id: 'created_at',
                //     header: t('ui.books.columns.created_at') || 'Created At',
                //     accessorKey: 'created_at',
                // }),,
            ] as ColumnDef<Book>[],
        [t, handleDeleteBook],
    );

    if (auth.permissions.includes('products.edit')) {
        columns.push(
            createActionsColumn<Book>({
                id: 'actions',
                header: t('ui.books.columns.actions') || 'Actions',
                renderActions: (book) => {
                    return (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                        <Menu className={`${book.hasActive ? 'text-orange-500' : 'text-green-500'} border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
`} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-56' align='end'>
                                    <DropdownMenuLabel className='text-center'> {t('ui.books.columns.actions')}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {!book.hasActive && (
                                        <DropdownMenuItem onClick={() => handleLoanButton(book.id)}>
                                            <div className='flex gap-3 align-center'><Handshake className="text-green-500" />

                                            {t('ui.books.buttons.loan')}</div>
                                        </DropdownMenuItem>
                                    )}{' '}
                                    {book.hasActive && (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setSelectedBook(book);
                                                setOpen(true);
                                            }}
                                        >
                                            <div className='flex gap-3 align-center'><ClipboardList className={`text-orange-500`} />
                                            {t('ui.books.buttons.queue')}</div>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>
                                        <Link href={`/books/${book.id}`}>
                                            <div className='flex gap-3 align-center'><CopyIcon className="h-4 w-4" />
                                            {t('ui.books.buttons.clone') || 'Clone book'}</div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                            <div className='flex gap-3 align-center'><PencilIcon className="h-4 w-4" />
                                            {t('ui.books.buttons.edit') || 'Edit book'}</div>
                                        </Link>
                                    </DropdownMenuItem>

                                        <DeleteDialog
                                            id={book.id}
                                            onDelete={handleDeleteBook}
                                            title={t('ui.books.delete.title') || 'Delete book'}
                                            description={
                                                t('ui.books.delete.description') ||
                                                'Are you sure you want to delete this book? This action cannot be undone.'
                                            }
                                            successMessage={t('messages.books.deleted')}
                                            trigger={
                                    <div className={cn(
                                            "hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
                                          )}>

                                                    <div className='flex gap-3 align-center'><TrashIcon className="text-destructive h-4 w-4" />
                                                    {t('ui.users.buttons.delete') || 'Delete user'}</div>
                                    </div>

                                            }
                                        />

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    );
                },
            }),
        );
    }
    return (
        <BookLayout title={t('ui.books.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.books.title')}</h1>
                        {auth.permissions.includes('products.edit') && (
                            <Link href="/books/create">
                                <Button>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    {t('ui.books.buttons.new')}
                                </Button>
                            </Link>
                        )}
                    </div>
                    <div></div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="w-full cursor-pointer justify-center text-center">
                                {t('ui.common.filters.trigger')}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <FiltersTable
                                        filters={
                                            [
                                                {
                                                    id: 'title',
                                                    label: t('ui.books.filters.title') || 'Titulo',
                                                    type: 'text',
                                                    placeholder: t('ui.books.placeholders.title') || 'Titulo...',
                                                },
                                                {
                                                    id: 'ISBN',
                                                    label: t('ISBN') || 'ISBN',
                                                    type: 'text',
                                                    placeholder: t('ui.books.placeholders.ISBN') || 'ISBN...',
                                                },
                                                {
                                                    id: 'available',
                                                    label: t('ui.books.filters.available') || 'Disponible',
                                                    type: 'select',
                                                    options: [
                                                        { label: 'Disponible', value: 'true' },
                                                        { label: 'No disponible', value: 'false' },
                                                    ],
                                                    placeholder: t('ui.books.placeholders.available') || 'Disponible...',
                                                },
                                                {
                                                    id: 'genres',
                                                    label: t('ui.books.filters.genres') || 'Géneros',
                                                    type: 'text',
                                                    placeholder: t('ui.books.placeholders.genres') || 'Géneros...',
                                                },
                                                {
                                                    id: 'author',
                                                    label: t('ui.books.filters.author') || 'Autor',
                                                    type: 'text',
                                                    placeholder: t('ui.books.placeholders.author') || 'Autor...',
                                                },
                                                {
                                                    id: 'pages',
                                                    label: t('ui.books.filters.pages') || 'Páginas',
                                                    type: 'number',
                                                    placeholder: t('ui.books.placeholders.pages') || 'Páginas...',
                                                },
                                                {
                                                    id: 'publisher',
                                                    label: t('ui.books.filters.publisher') || 'Editorial',
                                                    type: 'text',
                                                    placeholder: t('ui.books.placeholders.publisher') || 'Editorial...',
                                                },
                                                {
                                                    id: 'floor',
                                                    label: t('ui.books.filters.floor') || 'Piso',
                                                    type: 'select',
                                                    options: floor_list,
                                                    placeholder: t('ui.books.placeholders.floor') || 'Piso...',
                                                },
                                                {
                                                    id: 'zone',
                                                    label: t('ui.books.filters.zone') || 'Zona',
                                                    type: 'select',
                                                    options: zone_list,
                                                    placeholder: t('ui.books.placeholders.zone') || 'Zona...',
                                                },
                                                {
                                                    id: 'bookcase',
                                                    label: t('ui.books.filters.bookcase') || 'Estantería',
                                                    type: 'select',
                                                    options: bookcase_list,
                                                    placeholder: t('ui.books.placeholders.bookcase') || 'Estantería...',
                                                },
                                            ] as FilterConfig[]
                                        }
                                        onFilterChange={handleFilterChange}
                                        initialValues={filters}
                                        containerClassName="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="mb-5 w-full justify-center text-center">
                        {books?.meta.total !== undefined && <h2>{t('ui.common.filters.results', { attribute: books?.meta.total })}</h2>}
                    </div>

                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={10} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.books.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.books.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        books ?? {
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
                                    noResultsMessage={t('ui.books.no_results') || 'No books found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/** Reservation Dialog */}

            <Dialog
                open={open}
                onOpenChange={(val) => {
                    setOpen(val);
                    if (!val) {
                        setReserMail('');
                        setSelectedBook(null);
                    }
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('ui.reservations.utils.title')}</DialogTitle>
                        <DialogDescription>{t('ui.reservations.utils.description')}</DialogDescription>
                    </DialogHeader>
                    {selectedBook && (
                        <div className="grid gap-4 py-4">
                            <div className="items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    {t('ui.reservations.utils.book')}
                                </Label>
                                <Input disabled id="name" value={selectedBook.title} className="col-span-3" />
                            </div>
                            <div className="w-full items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    {t('ui.reservations.utils.email')}
                                </Label>
                                {/* popoverStyle */}

                                <div className="flex w-full items-center space-x-4">
                                    <Popover open={popOpen} onOpenChange={popSetOpen} modal={true}>
                                        <PopoverTrigger asChild className="w-full">
                                            <Button variant="outline" className="w-full justify-start">
                                                {reserMail ? <>{reserMail}</> : <>Email</>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0" side="bottom" align="start">
                                            <Command>
                                                <CommandInput placeholder="Email..." />
                                                <CommandList>
                                                    <CommandEmpty>No results found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {emailList.map((email) => (
                                                            <CommandItem
                                                                key={email.value}
                                                                value={email.value}
                                                                onSelect={(value) => {
                                                                    setReserMail(value);
                                                                    popSetOpen(false);
                                                                }}
                                                            >
                                                                {email.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                {/* popoverStyle */}

                                {/* <Input
                                    id="username"
                                    type="email"
                                    value={reserMail}
                                    onChange={(e) => setReserMail(e.target.value)}
                                    className="col-span-3"
                                /> */}
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                if (selectedBook) HandleReservation(selectedBook.id, reserMail);
                                //comprobar email Y libro
                                if (selectedBook) setOpen(false);
                            }}
                        >
                            {t('ui.reservations.utils.confirm')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </BookLayout>
    );
}
