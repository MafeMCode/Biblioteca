import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { BookcaseLayout } from "@/layouts/bookcases/BookcaseLayout";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Bookcase, useBookcases, useDeleteBookcase } from "@/hooks/bookcases/useBookcases";

export default function BookcasesIndex() {
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
    filters.search,
    filters.title ? `title:${filters.title}` : null,
    filters.author ? `author:${filters.author}` : null
  ].filter(Boolean).join(' ');

  const { data: bookcases, isLoading, isError, refetch } = useBookcases({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteBookcaseMutation = useDeleteBookcase();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteBookcase = async (id: string) => {
    try {
      await deleteBookcaseMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.bookcases.deleted_error") || "Error deleting bookcase");
      console.error("Error deleting bookcase:", error);
    }
  };

  const columns = useMemo(() => ([
    createTextColumn<Bookcase>({
      id: "number",
      header: t("ui.bookcases.columns.number") || "Number",
      accessorKey: "number",
    }),
    createTextColumn<Bookcase>({
      id: "capacity",
      header: t("ui.bookcases.columns.capacity") || "Capacity",
      accessorKey: "capacity",
    }),
    createTextColumn<Bookcase>({
      id: "floor_story",
      header: t("ui.bookcases.columns.floor") || "Floor",
      accessorKey: "floor_story",
    }),
    createTextColumn<Bookcase>({
      id: "zone_number",
      header: t("ui.bookcases.columns.zone") || "Zone",
      accessorKey: "zone_number",
    }),
    createDateColumn<Bookcase>({
      id: "created_at",
      header: t("ui.bookcases.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Bookcase>({
      id: "actions",
      header: t("ui.bookcases.columns.actions") || "Actions",
      renderActions: (bookcase) => (
        <>
          <Link href={`/bookcases/${bookcase.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.bookcases.buttons.edit") || "Edit bookcase"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={bookcase.id}
            onDelete={handleDeleteBookcase}
            title={t("ui.bookcases.delete.title") || "Delete bookcase"}
            description={t("ui.bookcases.delete.description") || "Are you sure you want to delete this bookcase? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.users.buttons.delete") || "Delete user"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Bookcase>[]), [t, handleDeleteBookcase]);

  return (
      <BookcaseLayout title={t('ui.bookcases.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.bookcases.title')}</h1>
                      <Link href="/bookcases/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.bookcases.buttons.new')}
                          </Button>
                      </Link>
                  </div>
                  <div></div>

                  <div className="space-y-4">
                      <FiltersTable
                          filters={
                              [
                                  {
                                      id: 'search',
                                      label: t('ui.bookcases.filters.search') || 'Buscar',
                                      type: 'text',
                                      placeholder: t('ui.bookcases.placeholders.search') || 'Buscar...',
                                  },
                                  {
                                      id: 'title',
                                      label: t('ui.bookcases.filters.title') || 'Titulo',
                                      type: 'text',
                                      placeholder: t('ui.bookcases.placeholders.title') || 'Titulo...',
                                  },
                                  {
                                      id: 'author',
                                      label: t('ui.bookcases.filters.author') || 'Autor',
                                      type: 'text',
                                      placeholder: t('ui.bookcases.placeholders.author') || 'Autor...',
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
                              <div className="mb-4 text-red-500">{t('ui.bookcases.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.bookcases.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      bookcases ?? {
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
                                  noResultsMessage={t('ui.bookcases.no_results') || 'No bookcases found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </BookcaseLayout>
  );
}
