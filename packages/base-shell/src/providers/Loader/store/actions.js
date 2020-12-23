import * as types from './types'

export function loading(name) {
    return {
        type: types.LOADING,
        name,
        payload: {
            isLoading: true,
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
            ok : false
        },
    }
}
