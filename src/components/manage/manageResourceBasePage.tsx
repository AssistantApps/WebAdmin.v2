import { Box, Button, Center, Flex, Heading, HStack, Input, InputGroup, InputLeftAddon, notificationService, Spacer, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr } from '@hope-ui/solid';
import { Property } from '@stitches/core/types/css';
import { Component, createSignal, For, JSX, onMount, Show } from 'solid-js';
import { ManageResourceMode } from '../../constants/enum/manageResourceMode';

import { NetworkState } from '../../constants/enum/networkState';
import { copyTextToClipboard } from '../../helper/browserHelper';
import { debounceLeading } from '../../helper/debounceHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { BaseCrudService } from '../../services/api/manage/baseCrudService';
import { Card } from '../common/card';
import { CodeModal } from '../common/code';
import { Dropdown } from '../common/dropdown';
import { SearchIcon } from '../common/icon/seachIcon';
import { PageHeader } from '../common/pageHeader';
import { WrapWhen } from '../common/wrapWhen';
import { CenterLoading, LoadingSpinner, SmolLoadingSpinner } from '../core/loading';
import { GridItemSize } from './grid';
import { ManageResourceBaseModal } from './modal/manageResourceBaseModal';
import { ManageResourceCreateOrUpdate } from './manageResourceCreateOrUpdateComp';
import { CodeIcon } from '../common/icon/codeIcon';
import { stringInputPopup } from '../../helper/popupHelper';
import { IDatabaseRecord } from '../../contracts/manageResource';
import { timeout } from '../../helper/asyncHelper';

interface ITableHeadProps {
    title: string;
    classNames?: string;
    width?: string;
    maxWidth?: string;
    textAlign?: Property.TextAlign;
}

interface IActionProps<T> {
    label: string;
    emoji: string;
    order: number;
    onClick: (item: T) => void;
}


interface IPropertyToFormMappingExtraProp<T> {
    prop: string;
    value: (item: T) => any;
}

export interface IPropertyToFormMapping<T> {
    component: Component<any>;
    gridItemSize: GridItemSize;
    property: string;
    label: string;
    placeholder?: string;
    hiddenIn?: Array<ManageResourceMode>;
    additional?: Array<IPropertyToFormMappingExtraProp<T>>;
    onChange?: string;
}

interface IProps<T, TK> {
    title: string;
    itemName: string;
    crudService: BaseCrudService<T>;
    serverPagination?: boolean;
    unknownPagination?: boolean;
    defaultItem?: T;
    searchTooltip?: string;
    searchFunc?: (item: T, searchText: string) => boolean;
    //
    tableHeadItems: Array<ITableHeadProps>;
    tableRowRender: (item: T) => JSX.Element;
    tableFooterItems?: Array<ITableHeadProps>;
    //
    actionsPerRow?: Array<IActionProps<T>>;
    disableEditAction?: boolean;
    disableDeleteAction?: boolean;
    disableGetByIdOption?: boolean;
    disableCopyGuidAction?: boolean;
    //
    propToFormMappings: Array<IPropertyToFormMapping<T>>;
    //
    striped?: "odd" | "even";
    highlightOnHover?: boolean;
    dense?: boolean;
    pageSizeOptions?: Array<number>;
    children?: JSX.Element;
}

const defaultPageSizeOpts = [10, 25, 50, 100];

export const ManageResourceBasePage: Component<IProps<any, any>> = <T extends IDatabaseRecord, TK>(props: IProps<T, TK>) => {
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);
    const [items, setItems] = createSignal<Array<T>>([]);
    const [searchText, setSearchText] = createSignal<string>('');
    const [page, setPage] = createSignal<number>(0);
    const [pageSize, setPageSize] = createSignal<number>(props.pageSizeOptions?.[0] ?? defaultPageSizeOpts[0]);
    const [totalRows, setTotalRows] = createSignal<number>(0);
    const [totalPages, setTotalPages] = createSignal<number>(0);
    const [itemBeingEdited, setItemBeingEdited] = createSignal<T>();
    const [itemBeingCreated, setItemBeingCreated] = createSignal<T>(props.defaultItem ?? anyObject);
    const [rowItemBeingWorkedOn, setRowItemBeingWorkedOn] = createSignal<string>();

    onMount(() => {
        getAllItems();
    });

    const getAllItems = async () => {
        const allItemsResult = await props.crudService.readAll({ page: page() + 1, searchText: searchText() });
        if (allItemsResult.isSuccess == false) {
            notificationService.show({
                status: 'danger',
                title: `Could not fetch all ${props.itemName}s`,
            });
            setNetworkState(NetworkState.Error);
            return;
        }

        setRowItemBeingWorkedOn(undefined);

        if (props.serverPagination) {
            setItems((allItemsResult.value as any).value);
            setTotalRows((allItemsResult.value as any).totalRows);
            setTotalPages((allItemsResult.value as any).totalPages);
            notificationService.clear();
        } else {
            setPage(0);
            setItems(allItemsResult.value);
            setTotalRows(allItemsResult.value.length);
            setTotalPages(Math.floor(allItemsResult.value.length / pageSize()));
        }
        setNetworkState(NetworkState.Success);
    }

    const getItemsToDisplay = (localItems: Array<T>, localSearchTerm: string) => {

        let filteredItems = getTotalFilteredItems(localItems, localSearchTerm);

        if (props.serverPagination) {
            return filteredItems;
        }

        return filteredItems.slice(
            page() * pageSize(),
            Math.min((page() + 1) * pageSize(), items().length)
        );
    }

    const getTotalFilteredItems = (localItems: Array<T>, localSearchTerm: string) => {

        if (props.serverPagination == true) {
            return localItems;
        }

        let filteredItems = [];
        if (props.searchFunc == null || localSearchTerm == null || localSearchTerm.length == 0) {
            filteredItems = localItems;
        } else {
            filteredItems = localItems.filter(item => props.searchFunc!(item, localSearchTerm));
        }

        return filteredItems
    }

    const readByGuid = async () => {
        const guid = await stringInputPopup({
            title: 'Please enter Guid',
            input: 'text',
            focusOnInput: true,
        });
        notificationService.show({
            status: 'info',
            title: `Fetching info for ${props.itemName}`,
        });
        const readItemResult = await props.crudService.read(guid);
        if (readItemResult.isSuccess == false) {
            notificationService.show({
                status: 'danger',
                title: `Unable to find ${props.itemName} by Id`,
            });
            return;
        }

        setItemBeingEdited(readItemResult.value as any);
    }

    const createItem = async () => {
        notificationService.show({
            status: 'info',
            title: `Creating ${props.itemName}`,
        });
        const createItemResult = await props.crudService.create(itemBeingCreated());
        if (createItemResult.isSuccess == false) {
            notificationService.show({
                status: 'danger',
                title: `Unable to create ${props.itemName}`,
            });
            return;
        } else {
            notificationService.clear();
            notificationService.show({
                status: 'success',
                title: `Created ${props.itemName} 🎉`,
            });
        }

        getAllItems();
    }

    const editItem = async () => {
        const localItemBeingEdited = itemBeingEdited();
        if (localItemBeingEdited == null) {
            notificationService.show({
                status: 'danger',
                title: `Could not edit ${props.itemName}`,
            });
            return;
        }

        setRowItemBeingWorkedOn(localItemBeingEdited.guid);
        setItemBeingEdited(undefined);
        notificationService.show({
            status: 'info',
            title: `Editing ${props.itemName}`,
        });

        await timeout(3000);

        const updateItemResult = await props.crudService.update(localItemBeingEdited);
        if (updateItemResult.isSuccess == false) {
            notificationService.show({
                status: 'danger',
                title: `Unable to update ${props.itemName}`,
            });
            setRowItemBeingWorkedOn(undefined);
            return;
        } else {
            notificationService.clear();
            notificationService.show({
                status: 'success',
                title: `Edited ${props.itemName} 🎉`,
            });
        }

        getAllItems();
    }

    const deleteItem = async (item: T) => {
        notificationService.show({
            status: 'info',
            title: `Deleting ${props.itemName}`,
        });
        setRowItemBeingWorkedOn(item.guid);

        const deleteResult = await props.crudService.del(item);
        if (deleteResult.isSuccess == false) {
            notificationService.show({
                status: 'danger',
                title: `Could not delete ${props.itemName}`,
            });
            setRowItemBeingWorkedOn(undefined);
            return;
        } else {
            notificationService.clear();
            notificationService.show({
                status: 'success',
                title: `Deleted ${props.itemName} 🎉`,
            });
        }

        getAllItems();
    }

    const getFormMappingsThatAreVisibleIn = (propToFormMappings: Array<IPropertyToFormMapping<T>>, mode: ManageResourceMode) =>
        (propToFormMappings ?? [])?.filter(form => {
            return (form.hiddenIn ?? []).includes(mode) == false;
        });

    const searchTextStyle: any = {
        variant: 'filled',
    }

    return (
        <>
            <PageHeader text={props.title}></PageHeader>
            <Box m={50}></Box>

            <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                <CenterLoading />
            </Show>
            <Show when={networkState() == NetworkState.Error}>
                <Center>Error</Center>
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                <Card class="section-read-all">
                    <Show when={props.searchFunc != null}>
                        <HStack mb="1em">
                            <Show when={props.disableGetByIdOption != true}>
                                <Spacer />
                                <Spacer />
                                <Tooltip label="Get item by guid">
                                    <Box
                                        class="pointer"
                                        backgroundColor="rgba(255, 255, 255, 0.1)"
                                        borderRadius="10px"
                                        p="5px 1em"
                                        display="inline-block"
                                        onClick={readByGuid}
                                    >
                                        <CodeIcon fontSize="2em" />
                                    </Box>
                                </Tooltip>
                            </Show>
                            <Spacer />
                            <InputGroup maxW="400px">
                                <WrapWhen
                                    condition={props.searchTooltip != null}
                                    wrapComp={Tooltip}
                                    wrapProps={{ 'label': props.searchTooltip }}
                                >
                                    <InputLeftAddon {...searchTextStyle}>
                                        <SearchIcon />
                                    </InputLeftAddon>
                                </WrapWhen>
                                <Input
                                    {...searchTextStyle}
                                    placeholder="Search"
                                    value={searchText()}
                                    type="text"
                                    onInput={debounceLeading(
                                        (e: any) => {
                                            setSearchText(e.target.value);
                                            getAllItems();
                                        },
                                    )}
                                />
                            </InputGroup>
                        </HStack>
                    </Show>
                    <Table
                        striped={props.striped ?? 'odd'}
                        highlightOnHover={props.highlightOnHover ?? true}
                        dense={props.dense ?? true}
                    >
                        <Thead>
                            <Tr>
                                <For each={props.tableHeadItems}>
                                    {(item) => (
                                        <Th
                                            class={item.classNames}
                                            width={item.width}
                                            maxWidth={item.maxWidth}
                                            textAlign={item.textAlign}
                                        >
                                            <Text class="clamp-to-2-lines">{item.title}</Text>
                                        </Th>
                                    )}
                                </For>
                                <Th textAlign="center">Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <For each={getItemsToDisplay(items(), searchText())}
                            >
                                {(item) => (
                                    <Tr>
                                        <Show
                                            when={rowItemBeingWorkedOn() == null || rowItemBeingWorkedOn() != item.guid}
                                            fallback={(
                                                <Td colSpan={props.tableHeadItems.length + 1}>
                                                    <Center><LoadingSpinner /></Center>
                                                </Td>
                                            )}
                                        >
                                            {props.tableRowRender(item)}
                                            <Td>
                                                <Flex justifyContent="center">
                                                    <For each={[
                                                        ...(!props.disableCopyGuidAction ? [{
                                                            emoji: '📋',
                                                            label: 'Copy Guid',
                                                            order: 1,
                                                            onClick: (actionItem: T) => copyTextToClipboard(actionItem.guid),
                                                        }] : []),
                                                        ...(!props.disableEditAction ? [{
                                                            emoji: '📝',
                                                            label: 'Edit',
                                                            order: 5,
                                                            onClick: (actionItem: T) => setItemBeingEdited(actionItem as any),
                                                        }] : []),
                                                        ...(!props.disableDeleteAction ? [{
                                                            emoji: '🚮',
                                                            label: 'Delete',
                                                            order: 99,
                                                            onClick: (actionItem: T) => deleteItem(actionItem),
                                                        }] : []),
                                                        ...(props.actionsPerRow ?? [])
                                                    ]}>
                                                        {(action) => (
                                                            <Tooltip label={action.label} placement="top">
                                                                <Text
                                                                    class="pointer action-item"
                                                                    size="xl"
                                                                    order={action.order}
                                                                    onClick={() => action.onClick(item)}
                                                                >{action.emoji}</Text>
                                                            </Tooltip>
                                                        )}
                                                    </For>
                                                </Flex>
                                            </Td>
                                        </Show>
                                    </Tr>
                                )}
                            </For>
                        </Tbody>
                        <Show when={props.tableFooterItems != null}>
                            <Tfoot>
                                <Tr>
                                    <For each={props.tableFooterItems}>
                                        {(item) => (
                                            <Th class={item.classNames}>{item.title}</Th>
                                        )}
                                    </For>
                                </Tr>
                            </Tfoot>
                        </Show>
                    </Table>
                    <HStack justifyContent="end" mt="$3">
                        <Box mx="1em">
                            <Button minWidth="75px" mx="0.25em"
                                disabled={page() < 1}
                                onClick={() => {
                                    setPage(prev => (prev - 1));
                                    if (props.serverPagination) {
                                        notificationService.show({
                                            status: 'info',
                                            title: 'Loading page',
                                        });
                                        getAllItems();
                                    }
                                }}
                            >&lt;</Button>
                            <Button minWidth="75px" mx="0.25em"
                                disabled={
                                    ((props.serverPagination != false) && page() >= Math.floor(items().length / pageSize())) ||
                                    ((props.serverPagination == true) && page() >= totalPages())
                                }
                                onClick={() => {
                                    setPage(prev => (prev + 1));
                                    if (props.serverPagination) {
                                        notificationService.show({
                                            status: 'info',
                                            title: 'Loading page',
                                        });
                                        getAllItems();
                                    }
                                }}
                            >&gt;</Button>
                        </Box>
                        <Show when={(props.pageSizeOptions ?? defaultPageSizeOpts).length > 1}>
                            <HStack mx="1em">
                                <Text>Page size: </Text>
                                <Dropdown
                                    title="Page size"
                                    hideTitle={true}
                                    selectedValues={[pageSize().toString()]}
                                    onSelect={(values: string | Array<string>) => {
                                        if (Array.isArray(values)) return;
                                        setPageSize(parseInt(values));
                                    }}
                                    options={(props.pageSizeOptions ?? defaultPageSizeOpts).map(opt => ({
                                        title: opt.toString(),
                                        value: opt.toString(),
                                    }))}
                                />
                            </HStack>
                        </Show>
                        <Box mx="1em">
                            <span>Rows</span>&nbsp;
                            <span>{(page() * pageSize()) + 1}</span>&nbsp;
                            <span>-</span>&nbsp;
                            <Show
                                when={props.unknownPagination != true}
                                fallback={(
                                    <>
                                        <span>{(page() + 1) * pageSize()}&nbsp;</span>
                                        <span>of</span>&nbsp;
                                        <span>{totalRows()}</span>
                                    </>
                                )}
                            >
                                <>
                                    <span>{Math.min(items().length, ((page() + 1) * pageSize()))}</span>&nbsp;
                                    <span>of</span>&nbsp;
                                    <span>{getTotalFilteredItems(items(), searchText()).length}</span>
                                </>
                            </Show>
                        </Box>
                    </HStack>
                </Card>

                <Show when={props.children != null}>
                    <Box m="2em" />
                    {props.children}
                </Show>

                <Box m="2em" />

                <Show when={getFormMappingsThatAreVisibleIn(props.propToFormMappings, ManageResourceMode.Add)?.length > 0}>
                    <Card class="section-create">
                        <Heading mb="1.5em">Create new record</Heading>
                        <ManageResourceCreateOrUpdate
                            mode={ManageResourceMode.Add}
                            item={props.defaultItem ?? anyObject}
                            mappings={props.propToFormMappings}
                            updateObject={(item: T) => setItemBeingCreated(_ => item)}
                            updateProperty={(prop: string, value: string) => {
                                console.log('create', { prop, value })
                                setItemBeingCreated(prev => ({ ...prev, [prop]: value }));
                            }}
                        />
                        <HStack justifyContent="center" mt="2em">
                            <Button onClick={createItem}>Add {props.itemName}</Button>
                        </HStack>
                    </Card>
                </Show>

                <Box m="8em" />

                <Show when={getFormMappingsThatAreVisibleIn(props.propToFormMappings, ManageResourceMode.Edit)?.length > 0}>
                    <ManageResourceBaseModal
                        title={`Edit - ${props.title}`}
                        isOpen={itemBeingEdited() != null}
                        onSave={editItem}
                        onClose={() => setItemBeingEdited(undefined)}
                    >
                        <ManageResourceCreateOrUpdate
                            mode={ManageResourceMode.Edit}
                            item={itemBeingEdited()!}
                            mappings={props.propToFormMappings}
                            updateObject={(item: T) => setItemBeingEdited(_ => item)}
                            updateProperty={(prop: string, value: string) => {
                                console.log('update', { prop, value })
                                setItemBeingEdited(prev => {
                                    console.log({ ...prev })
                                    return ({ ...prev, [prop]: value }) as any;
                                });
                            }}
                        />
                    </ManageResourceBaseModal>
                </Show>
            </Show>
        </>
    );
};

