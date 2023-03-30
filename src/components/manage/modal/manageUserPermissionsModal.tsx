
import { Box, Button, Center, Divider, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from '@hope-ui/solid';
import { Component, createEffect, createSignal, For, Show } from 'solid-js';

import { NetworkState } from '../../../constants/enum/networkState';
import { PermissionType } from '../../../contracts/generated/Enum/permissionType';
import { getArrFromEnum } from '../../../helper/enumHelper';
import { getManagePermissionsService } from '../../../services/api/manage/managePermissionService';
import { Card } from '../../common/card';
import { IDropdownOption } from '../../common/dropdown';
import { LoadingSpinner, SmolLoadingSpinner } from '../../core/loading';


interface IProps {
    title: string;
    isOpen: boolean;
    userGuid: string;
    onClose: () => void;
}

export const ManageUserPermissionsModal: Component<IProps> = (props: IProps) => {
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);
    const [addRequestCount, setAddRequestCount] = createSignal<Array<number>>([]);
    const [delRequestCount, setDelRequestCount] = createSignal<Array<number>>([]);
    const [permissions, setPermissions] = createSignal<Array<IDropdownOption>>([]);
    const [missingPermissions, setMissingPermissions] = createSignal<Array<IDropdownOption>>([]);

    createEffect(() => {
        if (props.userGuid != null) {
            fetchUserPermissions(props.userGuid);
        }
    });

    const mapPermsToDropdown = (perms: Array<PermissionType>) => {
        const localPerms = perms.map(p => ({
            title: PermissionType[p],
            value: p as any,
        }));
        localPerms.sort((a, b) => a.title.replace('View', '').replace('Manage', '').localeCompare(b.title.replace('View', '').replace('Manage', '')));
        return localPerms;
    }

    const fetchUserPermissions = async (guid: string) => {
        if (guid == null || guid.length < 5) {
            setPermissions([]);
            return;
        }

        const permsResult = await getManagePermissionsService().getPermissionsForUserGuid(guid);
        if (permsResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
            return;
        }

        const allPerms = getArrFromEnum(PermissionType)
            .filter(dt => dt > 0)
            .map(p => parseInt(p as any));
        const userPerms = permsResult.value;
        setPermissions(mapPermsToDropdown(userPerms));
        setMissingPermissions(mapPermsToDropdown(allPerms.filter(p => userPerms.includes(p) == false)));
        setNetworkState(NetworkState.Success);
        setAddRequestCount(prev => prev.slice(1, prev.length));
        setDelRequestCount(prev => prev.slice(1, prev.length));
    }

    const removePermissionFromUser = async (permission: PermissionType) => {
        setAddRequestCount(prev => [...prev, prev.length]);
        await getManagePermissionsService().delPermissionForUser(props.userGuid, permission);

        fetchUserPermissions(props.userGuid);
    }

    const addPermissionToUser = async (permission: PermissionType) => {
        setDelRequestCount(prev => [...prev, prev.length]);
        await getManagePermissionsService().addForUser(props.userGuid, permission);

        fetchUserPermissions(props.userGuid);
    }

    const renderPermissionBlock = (onClick: (permission: PermissionType) => void) => (permission: IDropdownOption) => {
        const blocks = handlePermTitle(permission.title);
        return (
            <Box class="perm-item noselect pointer" onClick={() => onClick(permission.value as any)}>
                <Card>
                    <span class="perm-emoji">{blocks[0]}</span>
                    <span class="perm-title">{blocks[1]}&nbsp;</span>
                    <span class={`perm-action ${(blocks[2] ?? ' ').toLowerCase()}`}>{blocks[2]}</span>
                </Card>
            </Box>
        )
    }

    const handlePermTitle = (permTitle: string) => {
        const localStr = permTitle
            .replace('appNotice', '📢 |App Notice|')
            .replace('app', '📲 |App|')
            .replace('cache', '💾 |Cache|')
            .replace('donation', '💰 |Donation|')
            .replace('feedbackForm', '💬 |Feedback From|')
            .replace('guideSubmission', '📑 |Guide Submission|')
            .replace('language', '🌐 |Language|')
            .replace('licence', '🛂 |Licence|')
            .replace('steamBranch', '🌿 |Steam Branch|')
            .replace('teamMember', '👪 |Team Member|')
            .replace('translationKey', '🌐 |Translation Key|')
            .replace('translationReport', '🌐 |Translation Report|')
            .replace('translation', '🌐 |Translation|')
            .replace('userPermissions', '🙎‍♂️ |User Permissions|')
            .replace('users', '🙎‍♂️ |Users|')
            .replace('version', '📅 |Versions|');
        return localStr.split('|');
    }

    return (
        <Modal opened={props.isOpen} size="7xl" onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{props.title}</ModalHeader>
                <ModalBody>
                    <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                        <Center height="25vh">
                            <LoadingSpinner />
                        </Center>
                    </Show>
                    <Show when={networkState() == NetworkState.Error}>
                        <Center>Error</Center>
                    </Show>
                    <Show when={networkState() == NetworkState.Success}>
                        <VStack>
                            <Heading size="xl" mb="1em">Current permissions</Heading>
                            <Flex gap="0.5em" flexWrap="wrap" justifyContent="center">
                                <Show
                                    when={permissions().length > 0}
                                    fallback={(<Text>No permissions</Text>)}
                                >
                                    <For each={permissions()}>{renderPermissionBlock(removePermissionFromUser)}</For>
                                </Show>
                                <For each={delRequestCount()}>
                                    {_ => (
                                        <Box class="perm-item">
                                            <Card>
                                                <Center><SmolLoadingSpinner /></Center>
                                            </Card>
                                        </Box>
                                    )}
                                </For>
                            </Flex>
                            <Divider mt="3em" />
                            <Heading size="xl" mt="2em" mb="1em">Permissions to Add</Heading>
                            <Flex gap="0.5em" flexWrap="wrap" justifyContent="center">
                                <Show
                                    when={missingPermissions().length > 0}
                                    fallback={(<Text>No permissions</Text>)}
                                >
                                    <For each={missingPermissions()}>{renderPermissionBlock(addPermissionToUser)}</For>
                                </Show>
                                <For each={addRequestCount()}>
                                    {_ => (
                                        <Box class="perm-item">
                                            <Card>
                                                <Center><SmolLoadingSpinner /></Center>
                                            </Card>
                                        </Box>
                                    )}
                                </For>
                            </Flex>
                        </VStack>
                    </Show>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

