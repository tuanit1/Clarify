const initState = {
    approvals: [],
    feature_selected: 0,
    refreshing: false,
    showProgress: true
}

//Reducer
const MainReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                approvals: action.approvals,
                features: action.features,
                approvers: action.approvers,
                refreshing: false,
                showProgress: false,
            }

        case 'SET_FEATURE':
            return {
                ...state,
                feature_selected: action.id
            }

        case 'SET_REFRESHING':
            return {
                ...state,
                refreshing: action.refreshing,
            }

        case 'SET_SHOW_PROGRESS':
            return {
                ...state,
                showProgress: action.visible,
            }
    }
}

//Action
export const SET_DATA = (approvals, features, approvers) => {
    return {
        type: 'SET_DATA',
        approvals,
        features,
        approvers
    }
}

export const SET_REFRESHING = (isRefreshing) => {
    return {
        type: 'SET_REFRESHING',
        refreshing: isRefreshing
    }
}

export const SET_SHOW_PROGRESS = (visible) => {
    return {
        type: 'SET_SHOW_PROGRESS',
        visible
    }
}

export const SET_FEATURE = (id) => {
    return {
        type: 'SET_FEATURE',
        id
    }
}


export default MainReducer