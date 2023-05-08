
import { AppViewModel, TranslationKeyViewModel } from '@assistantapps/assistantapps.api.client';
import { Box, Button, Heading, Td, Text } from '@hope-ui/solid';
import { Component, createSignal } from 'solid-js';

import { Card } from '../../components/common/card';
import { FetchAndRender } from '../../components/common/fetchWrap';
import { AppsDropdown } from '../../components/dropdown/appDropdown';
import { TableAppLogosCell } from '../../components/manage/appLogos';
import { codeModalMapping, isTranslatableMapping, sortOrderMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormImageDragAndDrop } from '../../components/manage/image';
import { FormLongInput, FormTextArea } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { ManageTranslationImageModal } from '../../components/manage/modal/manageTranslationImagesModal';
import { copyTextToClipboard } from '../../helper/browserHelper';
import { downloadContentAsFile } from '../../helper/documentHelper';
import { getManageTranslationKeysService } from '../../services/api/manage/manageTranslationKeysService';

export const ManageTranslationKeysPage: Component = () => {
    const [selectedTranslationKeyGuid, setSelectedTranslationKeyGuid] = createSignal<string>();

    const generateExportFile = (items: Array<TranslationKeyViewModel>) => {
        let textContent = 'enum LocaleKey {\n';

        for (const item of items) {
            textContent += `\t${item.key},\n`;
        }

        const additionalItems = [
            'inputTooShort',
            'inputTooLong',
            'emailNotValid',
            'inputTooLow',
            'inputTooHigh',
            'guideName',
            'guideSubTitle',
            'guideMinutes',
            'guideTags',
            'showCreatedBy',
            'guideSectionHeading',
            'guideSectionsAdd',
            'guideSectionAddText',
            'guideSectionAddLink',
            'guideSectionAddLinkName',
            'guideSectionAddLinkAddress',
            'guideSectionAddImage',
            'guideSectionAddImageCaption',
            'guideSectionAddMarkdown',
            'guideSectionAddMarkdownContent',
            'guideSectionAddMarkdownPreview',
            'guideSectionMoveUp',
            'guideSectionMoveDown',
            'guideSubmissionFailedTitle',
            'guideSubmissionFailedMessage',
            'guideSubmissionSuccessTitle',
            'guideSubmissionSuccessMessage',
            'loginRequiredTitle',
            'loginRequiredMessage',
        ];

        textContent += `\t//\n`;
        for (const itemKey of additionalItems) {
            textContent += `\t${itemKey},\n`;
        }
        textContent += '}';

        return textContent;
    }

    return (
        <FetchAndRender
            fetchApps={true}
            render={(apps: Array<AppViewModel>) => (
                <>
                    <ManageResourceBasePage
                        title="Manage TranslationKeys"
                        itemName="Translation Key"
                        disableGetByIdOption={true}
                        crudService={getManageTranslationKeysService()}
                        defaultItem={{ sortOrder: 0, isTranslatable: false }}
                        searchTooltip="Searches: key & meta & originalText"
                        setSortOrderOnItemLoad={true}
                        searchFunc={(item: TranslationKeyViewModel, searchText: string) => (
                            item.key.includes(searchText) ||
                            item.meta.includes(searchText) ||
                            item.original.includes(searchText)
                        )}
                        tableHeadItems={[
                            { title: 'Key', width: '15%' },
                            { title: 'App Types' },
                            { title: 'Meta' },
                            { title: 'Original' },
                            { title: 'Sort Order', maxWidth: '75px', textAlign: 'center' },
                            { title: 'Is Translatable', maxWidth: '75px', textAlign: 'center' },
                        ]}
                        tableRowRender={(item: TranslationKeyViewModel) => (
                            <>
                                <Td width="15%">
                                    <Text class="clamp-to-1-lines">{item.key}</Text>
                                </Td>
                                <TableAppLogosCell
                                    minWidth="128px"
                                    selectedApps={item.appGuids}
                                    appsFromApi={apps}
                                />
                                <Td width="20%">
                                    <Text class="clamp-to-2-lines">{item.meta}</Text>
                                </Td>
                                <Td width="40%">
                                    <Text class="clamp-to-2-lines">{item.original}</Text>
                                </Td>
                                <Td maxWidth="75px" margin="0 auto" textAlign="center">{item.sortOrder}</Td>
                                <Td maxWidth="75px" margin="0 auto" textAlign="center">{item.isTranslatable ? '✔' : '❌'}</Td>
                            </>
                        )}
                        actionsPerRow={[
                            {
                                emoji: '🖼️',
                                order: 6,
                                label: 'Manage images',
                                onClick: (item: TranslationKeyViewModel) => {
                                    setSelectedTranslationKeyGuid(item.guid);
                                }
                            }
                        ]}
                        propToFormMappings={[
                            {
                                component: FormLongInput,
                                gridItemSize: GridItemSize.long,
                                property: 'key',
                                label: 'Key',
                                placeholder: 'Key',
                            },
                            {
                                component: AppsDropdown,
                                gridItemSize: GridItemSize.long,
                                property: 'appGuids',
                                label: 'App Types',
                                placeholder: 'Please select an app',
                                additional: [
                                    {
                                        prop: 'appsFromApi',
                                        value: () => apps,
                                    },
                                    {
                                        prop: 'multiple',
                                        value: () => true,
                                    },
                                    {
                                        prop: 'preSelectedApps',
                                        value: (itemBeingEdited) => itemBeingEdited.appGuids,
                                    }
                                ]
                            },
                            {
                                component: FormLongInput,
                                gridItemSize: GridItemSize.xlong,
                                property: 'meta',
                                label: 'Meta',
                                placeholder: 'Description about the item',
                            },
                            {
                                component: FormTextArea,
                                gridItemSize: GridItemSize.medium,
                                property: 'original',
                                label: 'Original',
                                placeholder: 'English translation',
                            },
                            sortOrderMapping,
                            isTranslatableMapping,
                            codeModalMapping,
                            {
                                component: FormImageDragAndDrop,
                                gridItemSize: GridItemSize.xlong,
                                property: 'translationKeyImages',
                                label: 'Screenshot',
                                placeholder: 'Paste image here',
                            },
                        ]}
                        renderExportCard={(allItems: Array<TranslationKeyViewModel>) => (
                            <Card class="section-export">
                                <Heading mb="1.5em">Export TranslationKey</Heading>
                                <Button onClick={() => copyTextToClipboard(generateExportFile(allItems))}>Copy .dart export content</Button>
                                <Box m="0.5em" display="inline-block"></Box>
                                <Button onClick={() => downloadContentAsFile('locale_key.dart', generateExportFile(allItems))}>Download .dart export</Button>
                            </Card>
                        )}
                    />
                    <ManageTranslationImageModal
                        title="Manage images for translation key"
                        translationKeyGuid={selectedTranslationKeyGuid() ?? ''}
                        isOpen={selectedTranslationKeyGuid() != null}
                        onClose={() => setSelectedTranslationKeyGuid(undefined)}
                    />
                </>
            )}
        />
    );
};


export default ManageTranslationKeysPage;
