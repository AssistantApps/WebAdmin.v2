import { LanguageViewModel, TranslationKeyViewModel, TranslationReportStatus, TranslationReportViewModel } from '@assistantapps/assistantapps.api.client';
import { Td, Text } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { FetchAndRender } from '../../components/common/fetchWrap';
import { LanguageFromGuid } from '../../components/manage/language';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { copyTextToClipboard } from '../../helper/browserHelper';
import { formatDate } from '../../helper/dateHelper';
import { capitalizeFirstLetter } from '../../helper/stringHelper';
import { getManageTranslationReportService } from '../../services/api/manage/manageTranslationReportsService';

export const ManageTranslationReportsPage: Component = () => {

    return (
        <FetchAndRender
            fetchApps={true}
            fetchLanguages={true}
            render={(_: any, langs: Array<LanguageViewModel>, transKeys: Array<TranslationKeyViewModel>) => (
                <ManageResourceBasePage
                    title="Manage TranslationReports"
                    itemName="Translation Report"
                    disableEditAction={true}
                    disableDeleteAction={true}
                    disableGetByIdOption={true}
                    crudService={getManageTranslationReportService()}
                    tableHeadItems={[
                        { title: 'Language' },
                        { title: 'Date submitted', maxWidth: '75px', textAlign: 'center' },
                        { title: 'Reason' },
                        { title: 'Status' },
                    ]}
                    tableRowRender={(item: TranslationReportViewModel) => (
                        <>
                            <Td>
                                <LanguageFromGuid
                                    languageGuid={item.languageGuid}
                                    langsFromApi={langs}
                                />
                            </Td>
                            <Td maxWidth="75px" margin="0 auto" textAlign="center">{formatDate(item.dateSubmitted)}</Td>
                            <Td>
                                <Text class="clamp-to-2-lines">{item.reason}</Text>
                            </Td>
                            <Td>{capitalizeFirstLetter(TranslationReportStatus[item.status])}</Td>
                        </>
                    )}
                    actionsPerRow={[
                        {
                            emoji: '📝',
                            label: 'Copy Translation Guid',
                            order: 3,
                            onClick: (item: TranslationReportViewModel) => copyTextToClipboard(item.translationGuid),
                        },
                        {
                            emoji: '❌',
                            label: 'Mark as closed (do nothing)',
                            order: 8,
                            onClick: (item: TranslationReportViewModel, getAllItems: () => void) =>
                                getManageTranslationReportService().markAsClosed(item.guid).then(getAllItems),
                        },
                        {
                            emoji: '🗑️',
                            label: 'Resolve automatically (delete with all votes)',
                            order: 9,
                            onClick: (item: TranslationReportViewModel, getAllItems: () => void) =>
                                getManageTranslationReportService().markAsResolved(item.guid).then(getAllItems),
                        },
                    ]}
                    propToFormMappings={[]}
                />
            )}
        />
    );
};


export default ManageTranslationReportsPage;
