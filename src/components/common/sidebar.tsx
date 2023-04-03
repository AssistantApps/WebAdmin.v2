import { Box, Center, Divider, ElementType, Flex, Heading, IconButton, Image, Text, TextProps, VStack } from "@hope-ui/solid";
import { Component, For, Show } from "solid-js";

import { Link } from "@solidjs/router";
import { routes } from "../../constants/route";
import { getSidebarIsOpen } from "../../services/store/sections/sidebarState";
import { getStateService } from "../../services/store/stateService";
import { SidebarNavLink } from "./sidebarNavLink";
import { getAuthTokenExpire, getUserPermissions } from "../../services/store/sections/authState";
import { isLoggedIn } from "../../helper/loginHelper";
import { PermissionType } from "../../contracts/generated/Enum/permissionType";

export const Sidebar: Component = () => {
    const stateRef = getStateService();
    const [isOpen, setIsOpen] = getSidebarIsOpen(stateRef);
    const [tokenExpiry] = getAuthTokenExpire(stateRef);
    const [permissions] = getUserPermissions(stateRef);

    const SidebarTitle = <C extends ElementType = "p">(props: TextProps<C>) => {
        return (
            <Text
                fontSize="$sm"
                fontWeight="$bold"
                textTransform="uppercase"
                mb="$2"
                {...props}
            />
        );
    }

    const menuItems = [
        { route: routes.apps, title: '📲 Apps', requiredPerm: PermissionType.appView },
        { route: routes.languages, title: '🗣 Languages', requiredPerm: PermissionType.languageView },
        { route: routes.donations, title: '💰 Donations', requiredPerm: PermissionType.donationView },
        { route: routes.translationKeys, title: '🌐 Translation Keys', requiredPerm: PermissionType.translationKeyView },
        { route: routes.translationSubmissions, title: '🌐 Translation Submissions', requiredPerm: PermissionType.translationSubmissionView },
        { route: routes.translationReports, title: '🌐 Translation Reports', requiredPerm: PermissionType.translationReportView },
        { disabled: true, route: routes.guideSubmissions, title: '📑 Guide Submissions', requiredPerm: PermissionType.guideSubmissionView },
        { route: routes.steamBranches, title: '🌿 Steam Branches', requiredPerm: PermissionType.steamBranchManage },
        { route: routes.licences, title: '🛂 Licences', requiredPerm: PermissionType.licenceView },
        { route: routes.users, title: '🙍‍♂️ Users', requiredPerm: PermissionType.usersView },
        { route: routes.teamMembers, title: '👪 Team Members', requiredPerm: PermissionType.teamMemberView },
        { route: routes.serverCache, title: '💾 Server Cache', requiredPerm: PermissionType.cacheView },
        { route: routes.version, title: '📅 Version', requiredPerm: PermissionType.versionView },
        { route: routes.appNotices, title: '📢 App Notices', requiredPerm: PermissionType.appNoticeView },
        { route: routes.feedbackForms, title: '💬 Feedback Forms', requiredPerm: PermissionType.feedbackFormView },
        { disabled: true, route: routes.webhookMessages, title: '📨 Webhook messages', requiredPerm: PermissionType.appView },
    ]

    return (
        <Flex
            as="nav"
            class={isOpen() ? 'hide-scrollbar noselect close' : 'hide-scrollbar noselect expand'}
            position="sticky"
            display="flex"
            direction="column"
            flexShrink="0"
            width={isOpen() ? '$72' : '$10'}
            height="100vh"
            p={isOpen() ? '$6' : '0'}
        >
            <>
                <Box class="content" opacity={isOpen() ? '1' : '0'}>
                    <Box position="relative">
                        <Link href={routes.home}>
                            <Flex>
                                <Image src="/assets/img/logo.png" alt="logo" width="25%" />
                                <Box m="$2" />
                                <Center>
                                    <Heading>AssistantApps<br />Admin panel</Heading>
                                </Center>
                            </Flex>
                            <Box m={20} />
                            <Divider />
                        </Link>
                        <Text class='version'>v{import.meta.env.PACKAGE_VERSION}</Text>
                    </Box>
                    <Box m={20} />
                    <SidebarTitle>Quick links</SidebarTitle>
                    <VStack alignItems="flex-start" spacing="$1" mb="$6">
                        <Show
                            when={isLoggedIn(tokenExpiry())}
                            fallback={(
                                <>
                                    <SidebarNavLink href={routes.actualHome}>Home</SidebarNavLink>
                                    <SidebarNavLink href={routes.login}>Login</SidebarNavLink>
                                </>
                            )}
                        >
                            <SidebarNavLink href={routes.dashboard}>🏠 Dashboard</SidebarNavLink>

                            <For each={menuItems}>
                                {(menuItem) => (
                                    <Show when={permissions().includes(menuItem.requiredPerm)}>
                                        <SidebarNavLink
                                            href={menuItem.route}
                                            opacity={menuItem.disabled === true ? 0.25 : 1}
                                        >{menuItem.title}</SidebarNavLink>
                                    </Show>
                                )}
                            </For>
                        </Show>
                    </VStack>
                    <Box m={20} />
                </Box>
                <IconButton
                    colorScheme="primary"
                    aria-label="Close drawer"
                    borderRadius="2em"
                    class={isOpen() ? 'drawer-icon close' : 'drawer-icon expand'}
                    onClick={() => setIsOpen(!isOpen())}
                    icon={<span>☰</span>}
                />
            </>
        </Flex>
    );
}