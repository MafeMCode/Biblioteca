import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Book, ChartColumnStacked, FilePenLine, LandPlot, Layers, PencilRuler, Save, User, UserPen, X } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface BookFormProps {
    initialData?: {
        id: string;
        title: string;
        author: string;
        editor: string;
        length: number;
        bookcase_id: string;
        genre: string;
    };
    floors: {
        id: string;
        story: number;
    }[];
    zones: {
        id: string;
        number: number;
        floor_id: string;
        genreName: string;
    }[];
    bookcases: {
        id: string;
        number: number;
        books_count: number;
        capacity: number;
        zone_id: string;
    }[];
    genres: { value: string; label: string }[];
    page?: string;
    explosion?: string[];
    perPage?: string;
}
interface Genre {
    value: string;
    label?: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}
var generosFinales: string[] = [];

export function BookForm({ initialData, page, perPage, genres, explosion, floors, zones, bookcases }: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // Function to transform the genres array and add 'label' field
    const transformGenres = (genres: Genre[]) => {
        return genres.map((genre) => ({
            ...genre,
            label: t(`ui.genres.names.${genre.value}`), // Create the translation key dynamically
        }));
    };

    const transformedGenres = transformGenres(genres);

    let prePisoId = undefined;

    //ComboBox Controls
    const [selectedGenres, setSelectedGenres] = useState<string[]>(explosion ?? []);
    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(prePisoId);
    const [selectedZone, setSelectedZone] = useState<string | undefined>(undefined);
    const [selectedBookcase, setSelectedBookcase] = useState<string | undefined>(initialData?.bookcase_id);

    const handleFloorChange = (floorId: string) => {
        setSelectedFloor(floorId);
    };

    const handleZoneChange = (zoneId: string) => {
        setSelectedZone(zoneId);
    };

    useEffect(() => {
        if (explosion && initialData) {
            generosFinales = explosion;
            setSelectedGenres(explosion);
        } else {
            generosFinales = [];
            setSelectedGenres(generosFinales);
        }
    }, [explosion]);

    function comprobanteZona() {
        if (selectedZone != undefined) {
            return false;
        } else {
            return true;
        }
    }

    function comprobantePiso() {
        if (selectedFloor != undefined) {
            return false;
        } else {
            return true;
        }
    }
    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            title: initialData?.title ?? '',
            author: initialData?.author ?? '',
            editor: initialData?.editor ?? '',
            length: initialData?.length ?? undefined,
            bookcase_id: initialData?.bookcase_id ?? undefined,
        },
        onSubmit: async ({ value }) => {
            const bookData = {
                ...value,
                generos: selectedGenres,
            };
            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Libro creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['books'] });

                    // Construct URL with page parameters
                    let url = '/books';
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(initialData ? t('messages.books.error.update') : t('messages.books.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/books/${initialData.id}`, bookData, options);
            } else {
                router.post('/books', bookData, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                {/* Title field */}
                <div>
                    <form.Field
                        name="title"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.books.fields.title').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.books.fields.title').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Book color="grey" size={18} />
                                        {t('ui.books.fields.title')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.title')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                {/* Author field */}
                <div>
                    <form.Field
                        name="author"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.books.fields.author').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.books.fields.author').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <UserPen color="grey" size={18} />
                                        {t('ui.books.fields.author')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.author')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Editor field */}
                <div>
                    <form.Field
                        name="editor"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.books.fields.editor').toLowerCase() })
                                    : value.length < 2
                                      ? t('ui.validation.min.string', { attribute: t('ui.books.fields.editor').toLowerCase(), min: '2' })
                                      : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <FilePenLine color="grey" size={18} />
                                        {t('ui.books.fields.editor')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.editor')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Pages field */}
                <div>
                    <form.Field
                        name="length"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.books.fields.length').toLowerCase() }) : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <PencilRuler color="grey" size={18} />
                                        {t('ui.books.fields.length')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.length')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Genres Multi Select Field */}

                <div className="max-w-xl p-4">
                    <h1 className="mb-4 text-2xl font-bold">{t('ui.books.fields.genres')}</h1>
                    <MultiSelect
                        options={transformedGenres}
                        onValueChange={setSelectedGenres}
                        defaultValue={selectedGenres}
                        placeholder={t('ui.books.placeholders.genres')}
                        variant="inverted"
                        // animation={2}
                        maxCount={3}
                    />
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">{t('ui.books.fields.selgenres')}</h2>
                        <ul className="list-inside list-disc">
                            {selectedGenres.map((genre) => (
                                <li key={genre}>{t(`ui.genres.names.${genre}`)}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Floor Select */}

                <Label>
                    <div className="mb-1 flex items-center gap-1">
                        <Layers color="grey" size={18} />
                        {t('ui.bookcases.fields.floors')}
                    </div>
                </Label>
                <Select required={true} value={selectedFloor} onValueChange={(value) => handleFloorChange(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('ui.bookcases.fields.floor')} />
                    </SelectTrigger>
                    <SelectContent>
                        {floors.map((floor) => (
                            <SelectItem key={floor.id} value={floor.id}>
                                {t('ui.bookcases.fields.floor')} {floor.story}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Zone Select */}

                <Label>
                    <div className="mb-1 flex items-center gap-1">
                        <LandPlot color="grey" size={18} />
                        {t('ui.bookcases.fields.zones')}
                    </div>
                </Label>
                <Select
                                    disabled={comprobantePiso()} required={true} value={selectedZone} onValueChange={(value) => handleZoneChange(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('ui.bookcases.fields.zone')} />
                    </SelectTrigger>
                    <SelectContent>
                        {zones
                            .filter((zone) => zone.floor_id === selectedFloor)
                            .filter((zone) => selectedGenres.includes(zone.genreName))
                            .map((zone) => (
                                <SelectItem key={zone.id} value={zone.id}>
                                    {`${t(`ui.bookcases.fields.zone`)} ${zone.number} - ${t(`ui.genres.names.${zone.genreName}`)}`}
                                    {/* DIABLO */}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>

                {/* Bookcase field */}
                <div>
                    <form.Field
                        name="bookcase_id"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.bookcases.fieldsbookcase').toLowerCase() }) : null;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <ChartColumnStacked color="grey" size={18} />
                                        {t('ui.bookcases.fields.bookcases')}
                                    </div>
                                </Label>
                                <Select
                                    disabled={comprobanteZona()}
                                    required={true}
                                    value={selectedBookcase}
                                    onValueChange={(value) => field.handleChange(value)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={t('ui.bookcases.fields.bookcases')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bookcases
                                            .filter((bookcase) => bookcase.zone_id === selectedZone)
                                            .map((bookcase) => (
                                                <SelectItem
                                                    key={bookcase.id}
                                                    value={bookcase.id}
                                                    disabled={bookcase.books_count >= bookcase.capacity}
                                                >
                                                    {`${t(`ui.bookcases.fields.bookcase`)} ${bookcase.number} - ${bookcase.books_count}/${bookcase.capacity}`}
                                                    {bookcase.books_count >= bookcase.capacity ? '- Full' : '- Availible'}
                                                    {/* DIABLO */}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/books';
                            if (page) {
                                url += `?page=${page}`;
                                if (perPage) {
                                    url += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(url);
                        }}
                        disabled={form.state.isSubmitting}
                    >
                        <X />
                        {t('ui.books.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.books.buttons.saving')
                                    : initialData
                                      ? t('ui.books.buttons.update')
                                      : t('ui.books.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
