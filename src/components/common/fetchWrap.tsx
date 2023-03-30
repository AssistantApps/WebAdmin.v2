import { Center } from '@hope-ui/solid';
import { Component, createSignal, JSX, onMount, Show } from 'solid-js';
import { CenterLoading } from '../../components/core/loading';
import { NetworkState } from '../../constants/enum/networkState';
import { AppViewModel } from '../../contracts/generated/ViewModel/appViewModel';
import { LanguageViewModel } from '../../contracts/generated/ViewModel/languageViewModel';
import { TranslationKeyViewModel } from '../../contracts/generated/ViewModel/Translation/translationKeyViewModel';
import { getManageAppsService } from '../../services/api/manage/manageAppService';
import { getManageLanguageService } from '../../services/api/manage/manageLanguageService';
import { getManageTranslationKeysService } from '../../services/api/manage/manageTranslationKeysService';

interface IProps {
    fetchApps?: boolean;
    fetchLanguages?: boolean;
    fetchTranslationKeys?: boolean;
    render: (
        apps: Array<AppViewModel>,
        langs: Array<LanguageViewModel>,
        tKeys: Array<TranslationKeyViewModel>,
    ) => JSX.Element;
}

export const FetchAndRender: Component<IProps> = (props: IProps) => {
    const [apps, setApps] = createSignal<Array<AppViewModel>>([]);
    const [langs, setLangs] = createSignal<Array<LanguageViewModel>>([]);
    const [tKeys, setTKeys] = createSignal<Array<TranslationKeyViewModel>>([]);
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);

    onMount(() => {
        fetchAll();
    })

    const fetchAll = async () => {
        const promiseArr = [];
        if (props.fetchApps) promiseArr.push(fetchApps());
        if (props.fetchLanguages) promiseArr.push(fetchLang());
        if (props.fetchTranslationKeys) promiseArr.push(fetchTransKeys());

        await Promise.all(promiseArr);

        setNetworkState(NetworkState.Success);
    }

    const fetchApps = async () => {
        const aaResult = await getManageAppsService().readAllCached();
        if (aaResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
        }

        setApps(aaResult.value);
    }

    const fetchLang = async () => {
        const aaResult = await getManageLanguageService().readAllCached();
        if (aaResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
        }

        setLangs(aaResult.value);
    }

    const fetchTransKeys = async () => {
        const aaResult = await getManageTranslationKeysService().readAllCached();
        if (aaResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
        }

        setTKeys(aaResult.value);
    }

    return (
        <>
            <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                <CenterLoading />
            </Show>
            <Show when={networkState() == NetworkState.Error}>
                <Center>Error</Center>
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                {props.render(apps(), langs(), tKeys())}
            </Show>
        </>
    );
};


