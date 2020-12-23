import PropTypes from 'prop-types'
import React, { useReducer } from 'react'
import Context from './Context'
import reducer from './store/reducer'

import {
    loaded,
    loading,
    loadingWithError,
    loadedWithError
} from './store/actions'

const loaderInitState = {
    name: 'idle',
    lable: '',
    isLoading: null,
    isCanceled: null,
    ok: null
};

function getInitState() {
    const initialState = {
        loadingPool: 0
    };
    return initialState
}

const Provider = ({ appConfig, children }) => {
    const { loader } = appConfig || {}
    const { loadedWithErrorInterval = 3000 } = loader || {}

    const [state, dispatch] = useReducer(reducer, getInitState())

    const props = {
        loading: (name) => dispatch(loading(name)),
        loaded: (name) => dispatch(loaded(name)),
        loadedWithError: (name) => {
            dispatch(loadingWithError(name));
            setTimeout(() => { dispatch(loadedWithError(name)) }, loadedWithErrorInterval)
        },
        getLoader: (name) => (state[name] ? state[name] : { ...state, [name]: { ...loaderInitState } }),
        getLoadingPool: () => state.loadingPool,
    }

    return (
        <Context.Provider
            value={{
                ...props,
            }}
        >
            {children}
        </Context.Provider>
    )
}

Provider.propTypes = {
    children: PropTypes.any,
}

export default Provider
