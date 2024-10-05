import { AppShell, Burger, Group} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import AppLogo from '../../assets/logo.webp';
import './header.css';

function Header() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell.Header className="header-custom">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img src={AppLogo} className="logo" alt="logo"  width="50" height="60"/>
        </Group>
      </AppShell.Header>
    )
}
export default Header;