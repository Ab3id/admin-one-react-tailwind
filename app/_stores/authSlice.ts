import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: {
        accessToken: null,
        refreshToken: null
    },
    user: {
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        role: null,
        organization: {
            name: null,
            address: null,
            email: null,
            currency: null,
            taxPayerNumber: null,
            id: null,
            vatNumber: null
        }
    }
}



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.user = {
                ...action.payload.user,
                organization: action.payload.user?.organization || initialState.user.organization
            };
        },
        logout: (state) => {
            state.token = initialState.token;
            state.user = initialState.user;
            // Clear localStorage on logout
            if (typeof window !== 'undefined') {
                localStorage.clear();
            }
        },
        refreshToken: (state, action) => {
            state.token = action.payload.token
        },
        updateOrganization: (state, action) => {
            console.log('user before org update', state.user);
            if (state.user) {
                state.user.organization = action.payload.organization;
            }
        }
    }
});

export const {setCredentials, logout, refreshToken, updateOrganization} = authSlice.actions;
export default authSlice.reducer;