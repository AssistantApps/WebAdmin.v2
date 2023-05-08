
import { LanguageViewModel, TranslationKeyViewModel } from '@assistantapps/assistantapps.api.client';
import { Td } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { FetchAndRender } from '../../components/common/fetchWrap';
import { codeModalMapping, isVisibleMapping, sortOrderMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormImageInput, TableLogoCell, getCountryCodeImage } from '../../components/manage/image';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { TranslationKeyFromGuid } from '../../components/manage/translation';
import { getManageLanguageService } from '../../services/api/manage/manageLanguageService';

export const ManageLanguagesPage: Component = () => {

    return (
        <FetchAndRender
            fetchTranslationKeys={true}
            render={(_, __, tKeys: Array<TranslationKeyViewModel>) => (
                <ManageResourceBasePage
                    title="Manage Languages"
                    itemName="Language"
                    disableGetByIdOption={true}
                    crudService={getManageLanguageService()}
                    defaultItem={{ sortOrder: 0, isVisible: false }}
                    tableHeadItems={[
                        { title: 'Name' },
                        { title: 'Language code', maxWidth: '75px', textAlign: 'center' },
                        { title: 'Country code', maxWidth: '75px', textAlign: 'center' },
                        { title: 'Translation key' },
                        { title: 'Sort Order' },
                        { title: 'Is Visible' },
                    ]}
                    tableRowRender={(item: LanguageViewModel) => (
                        <>
                            <Td>{item.name}</Td>
                            <Td maxWidth="75px" textAlign="center">{item.languageCode}</Td>
                            <TableLogoCell url={getCountryCodeImage(item.countryCode)} showTooltip={true} maxWidth="75px" margin="0 auto" />
                            <Td>
                                <TranslationKeyFromGuid
                                    transKeyGuid={item.translationKeyGuid}
                                    keysFromApi={tKeys}
                                />
                            </Td>
                            <Td>{item.sortOrder}</Td>
                            <Td>{item.isVisible ? '✔' : '❌'}</Td>
                        </>
                    )}
                    propToFormMappings={[
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'name',
                            label: 'Name',
                            placeholder: 'English',
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'languageCode',
                            label: 'Language Code',
                            placeholder: 'en',
                        },
                        {
                            component: FormImageInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'countryCode',
                            label: 'Country Code',
                            placeholder: 'gb',
                            additional: [
                                {
                                    prop: 'imageValue',
                                    value: (itemBeingEdited) => getCountryCodeImage(itemBeingEdited.countryCode),
                                }
                            ]
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'translationKeyGuid',
                            label: 'Translation Key',
                            placeholder: 'english',
                        },
                        sortOrderMapping,
                        isVisibleMapping,
                        codeModalMapping,
                    ]}
                />
            )}
        />
    );
};

export default ManageLanguagesPage;
