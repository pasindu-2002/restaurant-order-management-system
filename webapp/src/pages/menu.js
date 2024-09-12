import { useEffect, useState } from 'react';
import Head from 'next/head';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { MenuTable } from 'src/sections/order/menu-table';
import { getMenuUrl } from 'src/constants/Constants';
import { getAPI } from 'src/api/ApiHandler';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAPI(getMenuUrl);
      if (response.status !== 200) {
        setError(response.message);
      } else {
        setError(null);
        const d = await response.data;
        setData(d);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
};

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

  }, [data]);

  return (
    loading ? <div>Loading...</div> : error != null ? <div>{error}</div> :
    <>
      <Head>
        <title>
          Menus 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Menu
                </Typography>
              </Stack>
              <div style={{display: 'flex', gap: '1rem'}}>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ShoppingCartIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  href='/'
                >
                  Orders
                </Button>
              </div>
            </Stack>
            <MenuTable
              count={data.length}
              items={data}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
