import { Center, Flex, hope } from "@hope-ui/solid";
import { Route, Routes } from "@solidjs/router";
import { Component, lazy, Suspense } from 'solid-js';

import { Sidebar } from './components/common/sidebar';
import { LoadingSpinner } from './components/core/loading';
import { removeAuthPrefix, routes } from './constants/route';
import { RouteGuard } from "./pages/auth/routeGuard";
import { HomePage, RedirectToHome } from "./pages/home";
import { NotFoundPage } from "./pages/notFound";

const AboutPage = lazy(() => import("./pages/about"));
const LoginPage = lazy(() => import("./pages/auth/login"));
const DashboardPage = lazy(() => import("./pages/dashboard"));

const ManageAppsPage = lazy(() => import("./pages/manage/apps"));
const ManageLanguagesPage = lazy(() => import("./pages/manage/languages"));
const ManageDonationsPage = lazy(() => import("./pages/manage/donations"));
const ManageTranslationKeysPage = lazy(() => import("./pages/manage/translationKeys"));
const ManageTranslationSubmissionsPage = lazy(() => import("./pages/manage/translationSubmissions"));
const ManageTranslationReportsPage = lazy(() => import('./pages/manage/translationReports'))
// const ManageGuideSubmissionsPage = lazy(() => import('./pages/manage/guideSubmissions'))
const ManageSteamBranchesPage = lazy(() => import('./pages/manage/steamBranches'))
const ManageLicencesPage = lazy(() => import('./pages/manage/licences'))
const ManageUsersPage = lazy(() => import('./pages/manage/users'))
const ManageTeamMembersPage = lazy(() => import('./pages/manage/teamMembers'))
const ManageServerCachePage = lazy(() => import('./pages/manage/serverCache'))
const ManageVersionsPage = lazy(() => import('./pages/manage/versions'))
const ManageAppNoticesPage = lazy(() => import('./pages/manage/appNotices'))
const ManageFeedbackFormsPage = lazy(() => import('./pages/manage/feedbackForms'))
const ManageFeedbackFormQuestionsPage = lazy(() => import('./pages/manage/feedbackFormQuestions'))
// const ManageWebhookMessagesPage = lazy(() => import('./pages/manage/webhookMessages'))

export const AppShell: Component = () => {

    return (
        <Flex maxH="100vh">
            <Sidebar />
            <hope.main w="$full" px="3em" overflowY="auto">
                <Suspense fallback={
                    <Center width="100%" height="100vh">
                        <LoadingSpinner />
                    </Center>
                }>
                    <Routes>
                        <Route path={routes.authPrefix} element={<RouteGuard />}>
                            <Route path={removeAuthPrefix(routes.dashboard)} component={DashboardPage} />
                            <Route path={removeAuthPrefix(routes.apps)} component={ManageAppsPage} />
                            <Route path={removeAuthPrefix(routes.languages)} component={ManageLanguagesPage} />
                            <Route path={removeAuthPrefix(routes.donations)} component={ManageDonationsPage} />
                            <Route path={removeAuthPrefix(routes.translationKeys)} component={ManageTranslationKeysPage} />
                            <Route path={removeAuthPrefix(routes.translationSubmissions)} component={ManageTranslationSubmissionsPage} />
                            <Route path={removeAuthPrefix(routes.translationReports)} component={ManageTranslationReportsPage} />
                            {/* <Route path={removeAuthPrefix(routes.guideSubmissions)} component={ManageGuideSubmissionsPage} /> */}
                            <Route path={removeAuthPrefix(routes.steamBranches)} component={ManageSteamBranchesPage} />
                            <Route path={removeAuthPrefix(routes.licences)} component={ManageLicencesPage} />
                            <Route path={removeAuthPrefix(routes.users)} component={ManageUsersPage} />
                            <Route path={removeAuthPrefix(routes.teamMembers)} component={ManageTeamMembersPage} />
                            <Route path={removeAuthPrefix(routes.serverCache)} component={ManageServerCachePage} />
                            <Route path={removeAuthPrefix(routes.version)} component={ManageVersionsPage} />
                            <Route path={removeAuthPrefix(routes.appNotices)} component={ManageAppNoticesPage} />
                            <Route path={removeAuthPrefix(routes.feedbackForms)} component={ManageFeedbackFormsPage} />
                            <Route path={removeAuthPrefix(routes.feedbackFormAnswers)} component={ManageFeedbackFormsPage} />
                            <Route path={removeAuthPrefix(routes.feedbackFormQuestions)} component={ManageFeedbackFormQuestionsPage} />
                            {/* <Route path={removeAuthPrefix(routes.webhookMessages)} component={ManageWebhookMessagesPage} /> */}
                        </Route>

                        <Route path={routes.login} component={LoginPage} />
                        <Route path={routes.about} component={AboutPage} />

                        <Route path={routes.actualHome} component={HomePage} />
                        <Route path={routes.home} component={RedirectToHome} />
                        <Route path={"*"} element={<NotFoundPage />} />
                    </Routes>

                    {/* <Footer /> */}
                </Suspense>
            </hope.main>
        </Flex>
    );
};