
import { Box, Center, Divider, Flex, Heading, Text, VStack } from '@hope-ui/solid';
import { Component, createSignal, For, onMount, Show } from 'solid-js';
import { Card } from '../../components/common/card';
import { PageHeader } from '../../components/common/pageHeader';
import { LoadingSpinner } from '../../components/core/loading';

import { TableLogoCell } from '../../components/manage/image';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { ManageUserPermissionsModal } from '../../components/manage/modal/manageUserPermissionsModal';
import { NetworkState } from '../../constants/enum/networkState';
import { UserViewModel } from '../../contracts/generated/ViewModel/User/userViewModel';
import { formatDate } from '../../helper/dateHelper';
import { getManageCacheService } from '../../services/api/manage/manageCacheService';
import { getManageUserService } from '../../services/api/manage/manageUserService';

export const ManageServerCachePage: Component = () => {
    const [inMemCacheItems, setInMemCacheItems] = createSignal<Array<string>>([]);
    const [redisCacheItems, setRedisCacheItems] = createSignal<Array<string>>([]);
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);

    onMount(() => {
        fetchAll();
    })

    const fetchAll = async () => {
        await Promise.all([
            fetchInMem(),
            fetchRedis(),
        ]);

        setNetworkState(NetworkState.Success);
    }

    const fetchInMem = async () => {
        const cacheItemsResult = await getManageCacheService().getInMemoryCacheItems();
        setInMemCacheItems(cacheItemsResult.value);
    }

    const deleteInMem = async (cacheItem: string) => {
        await getManageCacheService().delInMemoryCacheItem(cacheItem);
        fetchInMem();
    }

    const fetchRedis = async () => {
        const cacheItemsResult = await getManageCacheService().getRedisCacheItems();
        setRedisCacheItems(cacheItemsResult.value);
    }

    const deleteRedis = async (cacheItem: string) => {
        await getManageCacheService().delRedisCacheItem(cacheItem);
        fetchInMem();
    }

    const renderCacheItemBlock = (onClick: (cacheItem: string) => void) => (cacheItem: string) => {
        return (
            <Box class="perm-item noselect pointer" onClick={() => onClick(cacheItem)}>
                <Card>{cacheItem}&nbsp;<Text display="inline">❌</Text></Card>
            </Box>
        )
    }

    return (
        <>
            <PageHeader text="Manage ServerCache"></PageHeader>
            <Box m={50}></Box>

            <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                <Center height="25vh">
                    <LoadingSpinner />
                </Center>
            </Show>
            <Show when={networkState() == NetworkState.Error}>
                <Center>Error</Center>
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                <Card class="section-read-all">
                    <VStack>
                        <Heading size="xl" mb="1em">In Memory Cache items</Heading>
                        <Flex gap="0.5em" mb="1em" flexWrap="wrap">
                            <Show
                                when={inMemCacheItems().length > 0}
                                fallback={(<Text mt="1em">No Items</Text>)}
                            >
                                <For each={inMemCacheItems()}>{renderCacheItemBlock(deleteInMem)}</For>
                            </Show>
                        </Flex>
                        <Divider my="1em" />
                        <Heading size="xl" mt="1em" mb="1em">Redis Cache items</Heading>
                        <Flex gap="0.5em" mb="1em" flexWrap="wrap" justifyContent="center">
                            <Show
                                when={redisCacheItems().length > 0}
                                fallback={(<Text mt="1em">No Items</Text>)}
                            >
                                <For each={redisCacheItems()}>{renderCacheItemBlock(deleteRedis)}</For>
                            </Show>
                        </Flex>
                    </VStack>
                </Card>
            </Show>
        </>
    );
};

export default ManageServerCachePage;
