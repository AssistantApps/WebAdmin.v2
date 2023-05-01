
import { AppViewModel } from '@assistantapps/assistantapps.api.client';
import { Flex, Image, Td, Tooltip } from '@hope-ui/solid';
import { Component, For } from 'solid-js';

import { AppImage } from '../../constants/image';

interface ITableAppLogosCellProps {
    selectedApps: Array<string>;
    appsFromApi: Array<AppViewModel>;
    maxWidth?: string;
    minWidth?: string;
    margin?: string;
}

export const TableAppLogosCell: Component<ITableAppLogosCellProps> = (props: ITableAppLogosCellProps) => {

    const getSortedApp = (selectedApps: Array<string>, appsFromApi: Array<AppViewModel>): Array<string> => {
        const selectedAppsResult = [];
        for (const appFromApi of appsFromApi) {
            if (selectedApps.includes(appFromApi.guid)) {
                selectedAppsResult.push(appFromApi.guid);
            }
        }

        return selectedAppsResult;
    }

    const getAppIcon = (appGuid: string) => {
        const app = props.appsFromApi.find(aa => aa.guid == appGuid);
        if (app == null) return AppImage.fallbackImg;

        return app.iconUrl;
    }

    const getAppName = (appGuid: string) => {
        const app = props.appsFromApi.find(aa => aa.guid == appGuid);
        if (app == null) return 'Unknown';

        return app.name;
    }

    return (
        <Td minWidth={props.minWidth} maxWidth={props.maxWidth}>
            <Flex gap="0.5em" flexWrap="wrap">
                <For each={getSortedApp(props.selectedApps, props.appsFromApi)}>
                    {(item, index) => (
                        <Tooltip label={getAppName(item)}>
                            <Image src={getAppIcon(item)} class="logo-sm" margin={props.margin} />
                        </Tooltip>
                    )}
                </For>
            </Flex>
        </Td>
    );
};
