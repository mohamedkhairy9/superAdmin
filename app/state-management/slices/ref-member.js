import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const searchRef = createAsyncThunk('searchRef', async (member_code) => {
    const _baseURL = `http://localhost:5000/api/get-memberRef/${member_code}`;
    let res;
    let err;
    await axios.get(_baseURL)
        .then((response) => {
            res = response
        })
        .catch((error) => {
            err = error.response
        })
    if (res) return { data: res.data }
    else if (err) return { response: err.data }
})

export const addRef = createAsyncThunk('addRef', async (refMember) => {
    const _baseURL = `http://localhost:5000/api/insert-memberRef`;
    let res;
    let err;
    await axios.post(_baseURL, refMember)
        .then((response) => {
            res = response
            console.log(res)
        })
        .catch((error) => {
            err = error.response
            console.log(err)
        })
    if (res) return { data: res.data }
    else if (err) return { response: err.data }
})


const refMemberSlice = createSlice({
    name: 'refMember-slice',
    initialState: {
        searchValue: {
            member_code: ''
        },
        refValue: {
            member_code: '',
            name: '',
            member_type: 2,
            ref: '',
            sex: '',
            serial_no: '',
        },
        refMembers: [],
        isRef: false,
        isNotRef: false,

        isRefAdded: false,
        isRefNotAdded: false,
    },
    reducers: {
        resetDefault: (state) => {
            state.isRefAdded = false
            state.isRefNotAdded = false
        },
    },
    extraReducers: {
        [searchRef.pending]: (state, action) => { },
        [searchRef.fulfilled]: (state, action) => {
            if (action.payload.data?.message === "Success") {
                state.isRef = true
                state.isNotRef = false
                state.refMembers = action.payload.data?.specificMembers
                console.log(state.refMembers)
            } else if (action.payload.response?.error === "Member_ref not found") {
                state.isRef = false
                state.isNotRef = true
            }
        },
        [searchRef.rejected]: (state, action) => { },

        // *** *** *** *** *** *** *** *** *** *** ***
        // *** *** *** *** *** *** *** *** *** *** ***

        [addRef.pending]: (state, action) => { },
        [addRef.fulfilled]: (state, action) => {
            if (action.payload.data?.message === "Member_ref data inserted successfully") {
                state.isRefAdded = true
            } else if (action.payload.response?.error === "Duplicate name with the same member_code found") {
                state.isRefNotAdded = true
            }
        },
        [addRef.rejected]: (state, action) => { },
    }
})

export const { resetDefault } = refMemberSlice.actions;
export default refMemberSlice.reducer;
