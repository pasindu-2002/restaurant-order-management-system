import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { postAPI } from 'src/api/ApiHandler';
import { submitOrderUrl } from 'src/constants/Constants';

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const createID = () => {
    const min = 100; // Minimum value (inclusive)
    const max = 999; // Maximum value (inclusive)
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return "O-" + random.toString();
  }

  const createTotalPrice = () => {
    return Math.floor(Math.random() * (1500 - 100 + 1)) + 100;
  }

  const createdDate = () => {
    var today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }

  const formik = useFormik({
    initialValues: {
      item: '',
      customer: ''
    },
    validationSchema: Yup.object({
      item: Yup
        .string("Must be a string")
        .max(255)
        .required('Items are required'),
      customer: Yup
        .string("Must be a string")
        .max(255)
        .required('Username is required')
    }),
    onSubmit: async ({item, customer}, helpers) => {
      try {
        const itemIds = item.split(",");
        const response = await postAPI(submitOrderUrl, { id: createID(), date: createdDate(), itemIds , customerId: customer, totalPrice: createTotalPrice() }, {
          headers: {
            requestId: "Calling the create order api /order/submit/"
          }
        });
        if (response.error) {
          setError(true);
          console.log(response.error)
        } else {
          setError(null);
          router.push('/');
        }
      } catch (err) {
        console.log(err)
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    // error != null ? <div>Something went wrong</div> :
    <>
      <Head>
        <title>
          MegaPort Kit
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <Typography variant="h4">
                  Create a new Order
          </Typography>
          <Box
          sx={{
            py: '20px'
          }}
        />
          <div>
              <form
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.item && formik.errors.item)}
                    fullWidth
                    helperText={formik.touched.item && formik.errors.item}
                    label="Items of the order (Add comma separated item IDs)"
                    name="item"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.item}
                  />
                  <TextField
                    error={!!(formik.touched.customer && formik.errors.customer)}
                    fullWidth
                    helperText={formik.touched.customer && formik.errors.customer}
                    label="Customer ID"
                    name="customer"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.customer}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={() => {}}
                >
                  Back
                </Button>
              </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Page;
