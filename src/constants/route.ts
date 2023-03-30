
export const feedbackFormGuidParam = 'feedbackFormGuid';

export const routes = {
    home: '/',
    actualHome: '/home',
    authPrefix: '/auth',
    dashboard: '/auth/dashboard',
    apps: '/auth/apps',
    languages: '/auth/languages',
    donations: '/auth/donations',
    translationKeys: '/auth/translationKeys',
    translationSubmissions: '/auth/translationSubmissions',
    translationReports: '/auth/translationReports',
    guideSubmissions: '/auth/guideSubmissions',
    steamBranches: '/auth/steamBranches',
    licences: '/auth/licences',
    users: '/auth/users',
    teamMembers: '/auth/teamMembers',
    serverCache: '/auth/serverCache',
    version: '/auth/version',
    appNotices: '/auth/appNotices',
    feedbackForms: '/auth/feedbackForms',
    feedbackFormAnswers: `/auth/feedbackFormAnswers/:${feedbackFormGuidParam}`,
    feedbackFormQuestions: `/auth/feedbackFormQuestions/:${feedbackFormGuidParam}`,
    webhookMessages: '/auth/webhookMessages',

    login: '/login',
    about: '/about',
}

export const removeAuthPrefix = (route: string) => route.replace('/auth', '');
