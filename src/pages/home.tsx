
import { Box, Center, Heading, Image } from '@hope-ui/solid';
import { useNavigate } from '@solidjs/router';
import { Component, onMount } from 'solid-js';
import { PageHeader } from '../components/common/pageHeader';
import { CenterLoading } from '../components/core/loading';
import { routes } from '../constants/route';

export const HomePage: Component = () => {

    return (
        <>
            <PageHeader text="Home"></PageHeader>
            <Box m={50}></Box>



            <Box m={50}></Box>

            <Heading size="3xl" textAlign="center">Welcome to the No Man's Sky Social <b>Admin Panel!</b></Heading>
        </>
    );
};

export const RedirectToHome: Component = () => {
    const navigate = useNavigate();
    navigate(routes.actualHome);

    return (
        <CenterLoading />
    );
};
