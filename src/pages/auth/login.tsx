
import { Component, createSignal, onMount, Show } from 'solid-js';
import { Box, Center, Heading } from '@hope-ui/solid';
import { useNavigate } from '@solidjs/router';

import { Card } from '../../components/common/card';
import { PageHeader } from '../../components/common/pageHeader';
import { NetworkState } from '../../constants/enum/networkState';
import { routes } from '../../constants/route';
import { getGoogleAuth } from '../../services/external/googleAuthService';
import { CenterLoading } from '../../components/core/loading';

export const LoginPage: Component = () => {
    const navigate = useNavigate();
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Success);

    onMount(() => {
        getGoogleAuth().initButton(
            'buttonDiv',
            () => {
                setNetworkState(NetworkState.Loading);
            },
            () => {
                setNetworkState(NetworkState.Success);
                navigate(routes.dashboard, { replace: true });
            },
        );
        setTimeout(() => {
            getGoogleAuth().promptUser();
        }, 1000);
    });

    return (
        <>
            <PageHeader text="Login"></PageHeader>
            <Box m={50}></Box>

            <Show when={networkState() == NetworkState.Loading}>
                <CenterLoading />
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                <Center minH="50vh">
                    <Card>
                        <Heading mb="1em">Login using Google</Heading>
                        <div id="buttonDiv"></div>
                    </Card>
                </Center>
            </Show>
        </>
    );
};

export default LoginPage;