import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Bolt, Eye, EyeOff, FileText, Lock, Mail, PackageOpen, Save, Shield, User, Users, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
    page?: string;
    perPage?: string;
    roles?: string[];
    permisos?: string[];
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



export function UserForm({ initialData, page, perPage, roles, permisos }: UserFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // Parent checker function
    function parentChecker(nombrePadre: string){
        console.log(nombrePadre);

    }

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            email: initialData?.email ?? '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Usuario creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['users'] });

                    // Construct URL with page parameters
                    let url = '/users';
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
                        toast.error(initialData ? t('messages.users.error.update') : t('messages.users.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/users/${initialData.id}`, value, options);
            } else {
                router.post('/users', value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    const [showPassword, setShowPassword] = useState(false);

    const accesoPermisos = false;

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                <Tabs defaultValue="userForm">
                    <TabsList className="w-full">
                        <TabsTrigger value="userForm" className="w-1/2">
                            {t('ui.users.tabs.userForm')}
                        </TabsTrigger>
                        <TabsTrigger value="permissionsForm" className="w-1/2" disabled={accesoPermisos}>
                            {t('ui.users.tabs.permissionsForm')}
                        </TabsTrigger>
                    </TabsList>
                    <Separator />
                    <TabsContent value="userForm" className="w-full">
                        {/* Name field */}
                        <div>
                            <form.Field
                                name="name"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                            : value.length < 2
                                              ? t('ui.validation.min.string', { attribute: t('ui.users.fields.name').toLowerCase(), min: '2' })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <User color="grey" size={18} />
                                                {t('ui.users.fields.name')}
                                            </div>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.users.placeholders.name')}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                        {/* Email field */}
                        <div>
                            <form.Field
                                name="email"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.users.fields.email').toLowerCase() })
                                            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                              ? t('ui.validation.email', { attribute: t('ui.users.fields.email').toLowerCase() })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <Mail color="grey" size={18} />
                                                {t('ui.users.fields.email')}
                                            </div>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.users.placeholders.email')}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Password field */}
                        <div>
                            <form.Field
                                name="password"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!initialData && (!value || value.length === 0)) {
                                            return t('ui.validation.required', { attribute: t('ui.users.fields.password').toLowerCase() });
                                        }
                                        if (value && value.length > 0 && value.length < 8) {
                                            return t('ui.validation.min.string', {
                                                attribute: t('ui.users.fields.password').toLowerCase(),
                                                min: '8',
                                            });
                                        }
                                        return undefined;
                                    },
                                }}
                            >
                                {(field) => {
                                    return (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <Lock color="grey" size={18} />
                                                    {initialData ? t('ui.users.fields.password_optional') : t('ui.users.fields.password')}
                                                </div>
                                            </Label>

                                            {/* Input and Toggle Wrapper */}
                                            <div className="relative w-full">
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t('ui.users.placeholders.password')}
                                                    disabled={form.state.isSubmitting}
                                                    autoComplete="off"
                                                    required={false}
                                                    className="pr-10"
                                                />

                                                {/* Visibility Toggle Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>

                                            <p className="text-muted-foreground mt-1 text-xs">{t('ui.users.placeholders.passRulings')}</p>

                                            <FieldInfo field={field} />
                                        </>
                                    );
                                }}
                            </form.Field>
                        </div>
                    </TabsContent>
                    <TabsContent value="permissionsForm" className="w-full">
                        {/* Pre-selections field */}
                        <div>
                            <Label>
                                <div className="mb-1 flex items-center gap-1">
                                    <Shield color="grey" size={18} />
                                    {t('ui.users.fields.rolPpal')}
                                </div>
                            </Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('ui.users.roles.default')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">{t('ui.users.roles.default')}</SelectItem>
                                    <SelectItem value="admin">{t('ui.users.roles.admin')}</SelectItem>
                                    <SelectItem value="advanced">{t('ui.users.roles.advanced')}</SelectItem>
                                    <SelectItem value="basic">{t('ui.users.roles.basic')}</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="mt-3 mb-3">
                                <Separator />
                            </div>
                            <div className="mt-3 mb-1 flex items-center gap-1">
                                <Shield color="grey" size={18} />
                                {t('ui.users.fields.rolPpal')}
                            </div>
                            <div v-for="(item, index) in roles"></div>
                            <div className="mt-2 flex grid grid-cols-2 gap-4">
                                <Card className="grow">
                                    <CardHeader>
                                        <div className="flex gap-1">
                                            <Users color="#2762c2" size={18} />
                                            <CardTitle>{t('ui.users.gridelements.users')}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="users.view"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="showUser"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.showUser')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="users.create"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="createUser"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.createUser')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="users.edit"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="editUser"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.editUser')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="users.delete"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="deleteUser"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.deleteUser')}
                                                </label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="grow">
                                    <CardHeader>
                                        <div className="flex gap-1">
                                            <PackageOpen color="#2762c2" size={18} />
                                            <CardTitle>{t('ui.users.gridelements.products')}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="products.view" />
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="showProduct"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.showProduct')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="products.create"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="createProduct"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.createProduct')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="products.edit"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="editProduct"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.editProduct')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="products.delete"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="deleteProduct"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.deleteProduct')}
                                                </label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="grow">
                                    <CardHeader>
                                        <div className="flex gap-1">
                                            <FileText color="#2762c2" size={18} />
                                            <CardTitle>{t('ui.users.gridelements.reports')}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="reports.view" />
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="showReport"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.showReport')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="reports.export" />
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="exportReport"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.exportReport')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="reports.print"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="printReport"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.printReport')}
                                                </label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="grow">
                                    <CardHeader>
                                        <div className="flex gap-1">
                                            <Bolt color="#2762c2" size={18} />
                                            <CardTitle>{t('ui.users.gridelements.configurations')}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="config.access"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="accessConfig"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.accessConfig')}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex space-x-2">
                                            <Checkbox className="border-blue-500" id="config.modify"/>
                                            <div className="m-1 grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="modifyConfig"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {t('ui.users.gridelements.modifyConfig')}
                                                </label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
                <Separator className="mt-3" />
                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/users';
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
                        {t('ui.users.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.users.buttons.saving')
                                    : initialData
                                      ? t('ui.users.buttons.update')
                                      : t('ui.users.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
