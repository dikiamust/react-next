import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { ErrorText } from './styled';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { InputAdornment } from '@mui/material';
import { NextPage } from 'next';
import Cookies from 'js-cookie';
import Image from 'next/image';
// import ErrorIcon from '@/svg/error-icon.svg';
import ErrorIcon from '@mui/icons-material/Error';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import ContentLoading from './ContentLoading';
import { validationSchema } from './ validationSchema';
import Logo from '../../components/Logo';

const BOX = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '20vh',
  backgroundColor: '#1976d2',
}));

interface State {
  password: string;
  showPassword: boolean;
}

const SigninFormFormik: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [valuesPass, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...valuesPass,
      showPassword: !valuesPass.showPassword,
    });
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formik.values),
      });

      const validate = await response.json();

      const signInSucces = validate.code === 200 && validate.token;

      if (signInSucces) {
        setLoading(false);
        Cookies.set('token', validate.token);
        await router.push('/about');
      } else {
        setLoading(false);
        formik.setFieldError('email', 'Invalid credentials');
        formik.setFieldError('password', 'Invalid credentials');
      }
    },
  });

  const theme = useTheme();

  return (
    <>
    <Logo logo='original'/>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: '#1976d2',
          height: '63vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: 7, color: 'white' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              mt: 3,
              maxWidth: '350px',
              backgroundColor: 'white',
              padding: '35px',
              borderRadius: '10px',
            }}
            onBlur={formik.handleBlur}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <Box
                sx={{
                  display: 'flex',
                  mt: '10px',
                  alignItems: 'start',
                }}
              >
                <Box
                  sx={{
                    width: '16px',
                    height: '16px',
                    [theme.breakpoints.down('sm')]: {
                      width: '13px',
                      height: '13px',
                    },
                  }}
                >
                  {/* <Image
                    src={ErrorIcon}
                    alt="Error Icon"
                    objectFit="fill"
                    quality={100}
                  /> */}
                  <ErrorIcon/>
                </Box>
                <ErrorText>{formik.errors.email}</ErrorText>
              </Box>
            ) : null}

            <TextField
              margin="normal"
              required
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              type={valuesPass.showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {valuesPass.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <Box
                sx={{
                  display: 'flex',
                  mt: '10px',
                  alignItems: 'start',
                }}
              >
                <Box
                  sx={{
                    width: '16px',
                    height: '16px',
                    [theme.breakpoints.down('sm')]: {
                      width: '13px',
                      height: '13px',
                    },
                  }}
                >
                  {/* <Image
                    src={ErrorIcon}
                    alt="Error Icon"
                    objectFit="fill"
                    quality={100}
                  /> */}
                  <ErrorIcon/>
                </Box>
                <ErrorText>{formik.errors.password}</ErrorText>
              </Box>
            ) : null}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {loading ? <ContentLoading /> : <BOX />}
    </>
  );
};

export default SigninFormFormik;
