import { TranslationKeyViewModel, TranslationSubmittedDetailViewModel } from '@assistantapps/assistantapps.api.client';
import { Td, Text, Tooltip } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { FetchAndRender } from '../../components/common/fetchWrap';
import { getCountryCodeImage, TableLogoCell } from '../../components/manage/image';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { TranslationKeyFromGuid } from '../../components/manage/translation';
import { copyTextToClipboard } from '../../helper/browserHelper';
import { formatDate } from '../../helper/dateHelper';
import { getManageTranslationSubmissionsService } from '../../services/api/manage/manageTranslationSubmissionsService';

export const ManageTranslationSubmissionsPage: Component = () => {

    return (
        <FetchAndRender
            fetchTranslationKeys={true}
            render={(_: any, __: any, transKeys: Array<TranslationKeyViewModel>) => (
                <ManageResourceBasePage
                    title="Manage TranslationSubmissions"
                    itemName="Translation Submission"
                    serverPagination={true}
                    unknownPagination={true}
                    disableEditAction={true}
                    disableDeleteAction={true}
                    disableGetByIdOption={true}
                    crudService={getManageTranslationSubmissionsService()}
                    pageSizeOptions={[10]}
                    searchTooltip="Searches: text"
                    searchFunc={(item: TranslationSubmittedDetailViewModel, searchText: string) => (
                        item.text.includes(searchText)
                    )}
                    tableHeadItems={[
                        { title: 'Username' },
                        { title: 'Lang code', maxWidth: '75px' },
                        { title: 'Email', maxWidth: '75px' },
                        { title: 'TransKey' },
                        { title: 'Text' },
                        { title: 'Original' },
                        { title: 'Date submitted', maxWidth: '75px', textAlign: 'center' },
                    ]}
                    tableRowRender={(item: TranslationSubmittedDetailViewModel) => (
                        <>
                            <Td>{item.username}</Td>
                            <TableLogoCell url={getCountryCodeImage(item.countryCode)} showTooltip={true} maxWidth="75px" margin="0 auto" />
                            <Td>
                                <Tooltip label="Click to copy">
                                    <Text class="pointer" size="3xl" margin="0 auto" onClick={() => copyTextToClipboard(item.email)}>📧</Text>
                                </Tooltip>
                            </Td>
                            <Td>
                                <TranslationKeyFromGuid
                                    transKeyGuid={item.transKey}
                                    keysFromApi={transKeys}
                                />
                            </Td>
                            <Td>
                                <Text class="clamp-to-2-lines">{item.text}</Text>
                            </Td>
                            <Td>
                                <Text class="clamp-to-2-lines">{item.original}</Text>
                            </Td>
                            <Td maxWidth="75px" margin="0 auto" textAlign="center">{formatDate(item.dateSubmitted)}</Td>
                        </>
                    )}
                    propToFormMappings={[]}
                />
            )}
        />
    );
};


export default ManageTranslationSubmissionsPage;
