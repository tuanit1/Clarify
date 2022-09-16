const initState = {
    approvals: [],
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
                refreshing: false,
                showProgress: false,
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
export const SET_DATA = (approvals) => {
    return {
        type: 'SET_DATA',
        approvals
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

export default MainReducer