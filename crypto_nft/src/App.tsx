import React, { useState, useEffect } from 'react'
import { AppShell, Accordion ,  Card, Image, Text, Badge, Button, Group,Box , ScrollArea, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


import Header from './components/header/header.tsx';
import Footer from './components/footer/footer.tsx';
import './App.css';

// se debe crear como un objeto con el tipo de datos que se espera recibir
// de la api
/*
{
  "id": "cryptopunks",
  "contract_address": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  "name": "CryptoPunks",
  "asset_platform_id": "ethereum",
  "symbol": "PUNK"
}
*/
interface Nft {
  id: string;
  contract_address: string;
  name: string;
  asset_platform_id: string;
  symbol: string;
}

interface Image {
  small: string;
}

interface FloorPrice {
  native_currency: number;
  usd: number;
}

interface MarketCap {
  native_currency: number;
  usd: number;
}

interface Volume24h {
  native_currency: number;
  usd: number;
}

interface PriceChange {
  native_currency: number;
  usd: number;
}

interface Explorer {
  name: string;
  link: string;
}

interface Ath {
  native_currency: number;
  usd: number;
}

interface AthChangePercentage {
  native_currency: number;
  usd: number;
}

interface AthDate {
  native_currency: string;
  usd: string;
}

interface NftDetails {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  symbol: string;
  image: Image;
  banner_image: string;
  description: string;
  native_currency: string;
  native_currency_symbol: string;
  floor_price: FloorPrice;
  market_cap: MarketCap;
  volume_24h: Volume24h;
  floor_price_in_usd_24h_percentage_change: number;
  floor_price_24h_percentage_change: PriceChange;
  market_cap_24h_percentage_change: PriceChange;
  volume_24h_percentage_change: PriceChange;
  number_of_unique_addresses: number | null;
  number_of_unique_addresses_24h_percentage_change: number;
  volume_in_usd_24h_percentage_change: number;
  total_supply: number;
  one_day_sales: number;
  one_day_sales_24h_percentage_change: number;
  one_day_average_sale_price: number;
  one_day_average_sale_price_24h_percentage_change: number;
  links: {
    homepage: string;
    twitter: string;
    discord: string;
  };
  floor_price_7d_percentage_change: PriceChange;
  floor_price_14d_percentage_change: PriceChange;
  floor_price_30d_percentage_change: PriceChange;
  floor_price_60d_percentage_change: PriceChange;
  floor_price_1y_percentage_change: PriceChange;
  explorers: Explorer[];
  user_favorites_count: number;
  ath: Ath;
  ath_change_percentage: AthChangePercentage;
  ath_date: AthDate;
}


export function App() {
  const [opened, { toggle }] = useDisclosure();
  const [nfts, setNfts] = useState<Nft[]>([]); // Estado para almacenar los NFTs
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [selectedNft, setSelectedNft] = useState<NftDetails | null>(null); // Estado para el NFT seleccionado

  const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;

  // usar useEffect para hacer la solicitud a la API
  // https://dev.to/ayush_k_mandal/useeffect-hook-in-reactjs-with-typescript-beginner-5ch
  // Solicitud a la API con useEffect
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/nfts/list?x_cg_demo_api_key=${apiKey}&order=market_cap_usd_desc`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        setNfts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching crypto data:', error);
        setLoading(false);
      });
  }, [apiKey]);
  
  
  // Función para manejar el cambio en el Accordion
  const handleAccordionChange = (id: string) => {
    fetch(
      `https://api.coingecko.com/api/v3/nfts/${id}?x_cg_demo_api_key=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data: NftDetails) => {
        setSelectedNft(data); // Aquí se asegura de que el NFT seleccionado sea el correcto
      })
      .catch((error) => {
        console.error('Error fetching NFT details:', error);
      });
  };

  
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
     <Header /> 
      <AppShell.Navbar p="md">
        <AppShell.Section>NFTs populares</AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
        {loading ? (
            // Mostrar Skeletons mientras los datos cargan
            Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={28} mt="sm" animate={false} />
              ))
          ) : (
            // con la data ya lista, se hace un map para creat el componente
            // del acordeon
            nfts.map((nft) => (
              <Accordion className="item-custom2" variant="separated" radius="xl" >
              <Accordion.Item className="item-custom" key={nft.id} value={nft.id}>
              <Accordion.Control className="item-custom3" onClick={() => handleAccordionChange(nft.id)}>{nft.name}</Accordion.Control>
              <Accordion.Panel >Direción de contacto: {nft.contract_address}</Accordion.Panel>
            </Accordion.Item>
            </Accordion>
            ))
          )}
        </AppShell.Section>
        <Footer /> 
      </AppShell.Navbar>
      <AppShell.Main>
      {selectedNft ? (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={selectedNft.banner_image}
              height={320}
              alt="Norway"
            />
          </Card.Section>
    
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{selectedNft.name}</Text>
            <Badge color="pink">USD {selectedNft.floor_price.usd}</Badge>
          </Group>
    
          <Text size="sm" c="dimmed">
          <div dangerouslySetInnerHTML={{ __html: selectedNft.description }} />
          </Text>
    
          <Button color="blue" fullWidth mt="md" radius="md" onClick={() => window.location.href = selectedNft.links.homepage}>
            Go to project homepage
          </Button>
        </Card>
        
        ) : (
          <p>Selecciona un NFT para ver los detalles</p>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App
