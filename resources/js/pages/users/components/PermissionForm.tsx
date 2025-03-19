import { useState } from "react";
import { Shield, Save, X, Users, Bolt, PackageOpen, FileText, Nut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from "@/components/ui/select";

    // ----------------------------------------------------

    const items = [
        {
          id: "recents",
          label: "Recents",
        }
      ] as const



    // ----------------------------------------------------

interface PermissionFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
    page?: string;
    perPage?: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="mt-1 text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                </p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="mt-1 text-sm text-muted-foreground">Validating...</p>
            ) : null}
        </>
    );
}

export function PermissionForm({ initialData, page, perPage }: PermissionFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            preselector: initialData?.name ?? "",
            email: initialData?.email ?? "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["users"] });

                    // // Construct URL with page parameters
                    // let url = "/users";
                    // if (page) {
                    //     url += `?page=${page}`;
                    //     if (perPage) {
                    //         url += `&per_page=${perPage}`;
                    //     }
                    // }

                    // router.visit(url);


                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(
                            initialData
                                ? t("messages.users.error.update")
                                : t("messages.users.error.create")
                        );
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/users/${initialData.id}`, value, options);
            } else {
                router.post("/users", value, options);
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
            {/* Pre-selections field */}
            <div>
                <form.Field
                    name="preselector"
                    // validators={{
                    //     onChangeAsync: async ({ value }) => {
                    //         await new Promise((resolve) => setTimeout(resolve, 500));
                    //         return !value
                    //             ? t("ui.validation.required", { attribute: t("ui.users.fields.name").toLowerCase() })
                    //             : value.length < 2
                    //                 ? t("ui.validation.min.string", { attribute: t("ui.users.fields.name").toLowerCase(), min: "2" })
                    //                 : undefined;
                    //     },
                    // }}
                >
                    {(field) => (
                        <>
                            <Label htmlFor={field.name}>
                                <div className="flex items-center gap-1 mb-1">
                                    <Shield color="grey" size={18}/>
                                    {t("ui.users.fields.rolPpal")}
                                </div>
                            </Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t("ui.users.roles.default")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">{t("ui.users.roles.default")}</SelectItem>
                                    <SelectItem value="admin">{t("ui.users.roles.admin")}</SelectItem>
                                    <SelectItem value="advanced">{t("ui.users.roles.advanced")}</SelectItem>
                                    <SelectItem value="basic">{t("ui.users.roles.basic")}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>
                <div className="mb-3 mt-3">
                <Separator/>
                </div>
                <div className="flex items-center gap-1 mb-1 mt-3">
                                    <Shield color="grey" size={18}/>
                                    {t("ui.users.fields.rolPpal")}
                                </div>
                <div className="grid grid-cols-2 mt-2 gap-4 flex">
                    <div id="usersCard" className="grow">
                        <Card>
                        <CardHeader>
                            <div className="flex gap-1">
                                <Users color="#2762c2" size={18}/>
                                <CardTitle>{t("ui.users.gridelements.users")}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="showUser" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="createUser" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="editUser" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="deleteUser" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                        </Card>
                    </div>
                    <div id="productsCard" className="grow">
                        <Card>
                        <CardHeader>

                        <div className="flex gap-1">
                                <PackageOpen color="#2762c2" size={18}/>
                            <CardTitle>{t("ui.users.gridelements.products")}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                        <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="showProduct" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="createProduct" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="editProduct" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="deleteProduct" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                        </Card>
                    </div>
                    <div id="reportsCard" className="grow">
                        <Card>
                        <CardHeader>

                        <div className="flex gap-1">
                                <FileText color="#2762c2" size={18}/>
                            <CardTitle>{t("ui.users.gridelements.reports")}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                        <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="showReport" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="exportReport" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="printReport" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                        </Card>
                    </div>
                    <div id="configCard" className="grow">
                        <Card>
                        <CardHeader>
                            <div className="flex gap-1">
                                <Bolt color="#2762c2" size={18}/>
                            <CardTitle>{t("ui.users.gridelements.configurations")}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                        <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="accessConfig" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox className="accent-blue" id="modifyConfig" />
                                <div className="grid gap-1.5 leading-none m-1">
                                    <label
                                    htmlFor="verusuarios"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Elemento
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Separator/>

            {/* Form buttons */}
            <div className="flex justify-center gap-100 mt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        let url = "/users";
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
                    {t("ui.users.buttons.cancel")}
                </Button>


                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t("ui.users.buttons.saving")
                                    : initialData
                                        ? t("ui.users.buttons.update")
                                        : t("ui.users.buttons.save")}
                            </Button>

                        )}
                    </form.Subscribe>


            </div>


        </form>

    );
}
