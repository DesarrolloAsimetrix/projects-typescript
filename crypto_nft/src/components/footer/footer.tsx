import { AppShell, Burger, Group} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

let currentYear = new Date().getFullYear()
function Footer() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell.Section > Crypto Ponzi - ©  {currentYear} </AppShell.Section>
    )
}

export default Footer;

