import { ISteamBranchRow } from '@assistantapps/assistantapps.api.client';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, Td } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { CodeModal } from '../../components/common/code';
import { CodeIcon } from '../../components/common/icon/codeIcon';
import { GridItemSize } from '../../components/manage/grid';
import { FormTextArea } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { ManageResourceMode } from '../../constants/enum/manageResourceMode';
import { getManageSteamBranchService } from '../../services/api/manage/manageSteamBranchesService';

export const ManageSteamBranchesPage: Component = () => {

    return (
        <>
            <ManageResourceBasePage
                title="Manage Steam Branches"
                itemName="Steam Branches"
                disableDeleteAction={true}
                disableGetByIdOption={true}
                crudService={getManageSteamBranchService()}
                pageSizeOptions={[10]}
                tableHeadItems={[
                    { title: 'App' },
                    { title: 'Branches' },
                ]}
                tableRowRender={(item: ISteamBranchRow) => (
                    <>
                        <Td>{item.appType ?? 'unknown'}</Td>
                        <Td>
                            <CodeModal
                                title="Steam Branches"
                                label="unused"
                                trigger={(onOpen: () => void) => (
                                    <Button onClick={onOpen}>
                                        <CodeIcon fontSize="1.5em" />&nbsp;View Json
                                    </Button>
                                )}
                                disableInput={true}
                                codeContent={JSON.stringify(item.branches, null, 2)}
                                language="language-json"
                                onChange={() => { }}
                            />
                        </Td>
                    </>
                )}
                propToFormMappings={[
                    {
                        component: FormTextArea,
                        gridItemSize: GridItemSize.xlong,
                        property: 'branchesSTRING',
                        label: 'Branches',
                        placeholder: '[]',
                        hiddenIn: [ManageResourceMode.Add],
                        additional: [
                            {
                                prop: 'value',
                                value: (item: ISteamBranchRow) => JSON.stringify(item.branches, null, 2),
                            },
                            {
                                prop: 'minH',
                                value: () => '50vh',
                            },
                        ]
                    },
                ]}
            >
                <Flex justifyContent="center">
                    <Alert status="warning">
                        <AlertIcon mr="1em" />
                        <Box flex="1">
                            <AlertTitle>Clear the cache!</AlertTitle>
                            <AlertDescription display="block">
                                Don't forget to clear the <b>Steam Branches</b> cache after editing 😋
                            </AlertDescription>
                        </Box>
                    </Alert>
                </Flex>
            </ManageResourceBasePage>
        </>
    );
};


export default ManageSteamBranchesPage;
