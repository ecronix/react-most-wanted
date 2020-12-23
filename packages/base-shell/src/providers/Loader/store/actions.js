import * as types from './types'

export function loading(name) {
    return {
        type: types.LOADING,
        name,
        payload: {
            isLoading: true,
            type: `${name}_${types.LOADING}`,
            ok: null
        },
    }
}

export function loaded(name) {
    return {
        type: types.LOADED,
        name,
        payload: {
            isLoading: false,
            type: `${name}_${types.LOADED}`,
            ok:true
        },
    }
}

export function loadingWithError(name) {
    return {
        type: types.LOADING_WITH_ERROR,
        name,
        payload: {
            isLoading: true,
            type: `${name}_${types.LOADING_WITH_ERROR}`,
            ok : false
        },
    }
}
export function loadedWithError(name) {
    return {
        type: types.LOADED_WITH_ERROR,
        name,
        payload: {
            isLoading: false,
            type: `${name}_${types.LOADED_WITH_ERROR}`,
            ok : false
        },
    }
}
