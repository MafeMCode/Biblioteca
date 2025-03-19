import { UserForm } from "@/pages/users/components/UserForm";
import { PermissionForm } from "@/pages/users/components/PermissionForm"
import { UserLayout } from "@/layouts/users/UserLayout";
import { User } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";


export default function CreateUser() {
  const { t } = useTranslations();



  return (
    <UserLayout title={t("ui.users.create")}>
        <div className="max-w-screen flex items-center self-center">
        <Card className="w-100% shadow-lg dark:shadow-white dark:shadow-xs p-4 m-4">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-1">
                        <User color="#2762c2"/>{t("ui.users.cards.title")}
                    </div>
                </CardTitle>
                <CardDescription>{t("ui.users.cards.description")}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                    <div>
                    <div>
        <Tabs defaultValue="userForm">
                            <TabsList className="w-full">
                                <TabsTrigger value="userForm" className="w-1/2">{t("ui.users.tabs.userForm")}</TabsTrigger>
                                <TabsTrigger value="permissionsForm" className="w-1/2">{t("ui.users.tabs.permissionsForm")}</TabsTrigger>
                            </TabsList>
                            <Separator />
                            <TabsContent value="userForm" className="w-full">
                                <UserForm />
                                </TabsContent>
                            <TabsContent value="permissionsForm" className="w-full">
                                <PermissionForm />
                            </TabsContent>
                        </Tabs>

                        </div>
                    </div>
            </CardContent>
        </Card>
        </div>


    </UserLayout>
  );
}
