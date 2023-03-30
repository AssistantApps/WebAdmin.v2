
import { Box, Center, Grid, GridItem, Heading, HStack, ListItem, SimpleGrid, UnorderedList, VStack } from '@hope-ui/solid';
import { useNavigate } from '@solidjs/router';
import { Component, createSignal, For, onMount, Show } from 'solid-js';
import { Card } from '../components/common/card';

import { PageHeader } from '../components/common/pageHeader';
import { CenterLoading } from '../components/core/loading';
import { UserActivityListItem } from '../components/userActivity';
import { NetworkState } from '../constants/enum/networkState';
import { routes } from '../constants/route';
import { DashboardItemViewModel } from '../contracts/generated/ViewModel/dashboardItemViewModel';
import { UserActivityViewModel } from '../contracts/generated/ViewModel/User/userActivityViewModel';
import { Result } from '../contracts/resultWithValue';
import { errorPopup } from '../helper/popupHelper';
import { getAssistantAppsApi } from '../services/api/assistantAppsApiService';
import { getManagePermissionsService } from '../services/api/manage/managePermissionService';
import { getUserPermissions } from '../services/store/sections/authState';
import { getStateService } from '../services/store/stateService';

export const DashboardPage: Component = () => {
    const navigate = useNavigate();
    const stateRef = getStateService();
    const [_, setPermissions] = getUserPermissions(stateRef);

    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);
    const [items, setItems] = createSignal<Array<DashboardItemViewModel>>([]);
    const [userActivities, setUserActivities] = createSignal<Array<UserActivityViewModel>>([]);

    onMount(() => {
        getAllRequests();
    });

    const getAllRequests = async () => {
        await Promise.allSettled([
            getUserPerms(),
            getDashboardItems(),
            getUserActivities(),
        ]);

        setNetworkState(NetworkState.Success);
    }

    const getUserPerms = async (): Promise<Result> => {
        const perms = await getManagePermissionsService().getCurrentUsersPermissions();
        if (perms.isSuccess == false) {
            errorPopup({
                title: 'Permissions error',
                description: 'There was an error fetching your permissions, please try logging in again',
                onConfirm: () => navigate(routes.login, { replace: true }),
            })
        } else {
            setPermissions(perms.value);
        }

        return perms;
    }

    const getDashboardItems = async (): Promise<Result> => {
        const dashItemsResult = await getAssistantAppsApi().getDashboardForAdmin();
        if (dashItemsResult.isSuccess) {
            setItems(dashItemsResult.value);
        }

        return dashItemsResult;
    }

    const getUserActivities = async (): Promise<Result> => {
        const userActivitiesResult = await getAssistantAppsApi().getUserActivity();
        if (userActivitiesResult.isSuccess) {
            setUserActivities(userActivitiesResult.value);
        }

        return userActivitiesResult;
    }

    return (
        <>
            <PageHeader text="Dashboard"></PageHeader>
            <Box m={50}></Box>

            <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                <CenterLoading />
            </Show>
            <Show when={networkState() == NetworkState.Error}>
                <Center>Error</Center>
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                <VStack>
                    <Box class="dashboard-tiles" width="100%">
                        <SimpleGrid minChildWidth="300px" gap="1em">
                            <For each={items()}>
                                {(item) => (
                                    <Card class="card-bg-20">
                                        <VStack>
                                            <Heading size="2xl">{item.name}</Heading>
                                            <Heading size="xl" fontWeight="$light">{item.value}</Heading>
                                        </VStack>
                                    </Card>
                                )}
                            </For>
                        </SimpleGrid>
                    </Box>
                    <HStack mt="2em" width="100%" gap="2em" alignItems="start">
                        <Box flex={1}>
                            <Heading>User activity</Heading>
                            <VStack justifyContent="start">
                                <For each={userActivities()}>
                                    {(userActivity) => (
                                        <UserActivityListItem {...userActivity} />
                                    )}
                                </For>
                            </VStack>
                        </Box>
                        <Box flex={1}>
                            <Heading>Reviews</Heading>
                        </Box>
                    </HStack>
                </VStack>
            </Show>
        </>
    );
};

export default DashboardPage;