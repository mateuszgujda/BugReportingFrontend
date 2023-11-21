import { Box, Button, Card, CardContent, Divider, FormControl, Grid, Icon, Toolbar, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoginIcon from '@mui/icons-material/Login';
import FormInputText from "../controls/input/formInput";
import React, { useEffect } from "react";
import { useAuthApi } from "../api/auth/api";
import { useAuth } from "../providers/authProvider";
import { useNavigate } from "react-router";

interface LoginFormState {
    email: string,
    password: string
}

export default () => {
    const defaultLoginFormState: LoginFormState = {
        email: '',
        password: ''
    }

    const { handleSubmit, reset, control, setValue } = useForm<LoginFormState>({
        defaultValues: defaultLoginFormState,
    });

    const {
        authUser: { query: authUser, data, isLoading },
      } = useAuthApi();


    const onSubmit = React.useCallback(async (values: LoginFormState) => {


          await authUser({email: values.email, password: values.password});

          console.log(data);
    }, []);

    const {setAuthValue, token} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(token)
        {
            console.log("alreadyLoggedIn");
            //user already logged in navigate home
            navigate("/");
        }
        else
        {
            if(data)
            {
                console.log("userLoggedIn");
                navigate("/");
                console.log(data);
                if(localStorage.getItem("__access-token") && setAuthValue)
                {
                    setAuthValue(localStorage.getItem("__access-token") as string);
                }

            }
        }

    }, [data]);

    return <Card sx={{ minWidth: 150 }}>
        <CardContent>
            <Box>
                <Icon>
                    <LoginIcon />
                </Icon>
                <Typography variant="h5" component="span">
                    Sign Up
                </Typography>
            </Box>
            <Divider />
            <Toolbar />
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Grid alignItems={"center"} container spacing={2}>
                        <Grid xs={12} item={true}>
                            <FormInputText name="email" control={control} type="Text" label="Email" />
                        </Grid>
                        <Grid xs={12} item={true}>
                            <FormControl fullWidth>
                                <FormInputText name="password" label={"Password"} type="Password" control={control}></FormInputText>
                            </FormControl>
                        </Grid>
                        <Grid xs={6} item={true}>
                            <Box display={"flex"} flexDirection={"row-reverse"}>
                                <Button type="submit" variant="contained">Login</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </CardContent>
    </Card>
}