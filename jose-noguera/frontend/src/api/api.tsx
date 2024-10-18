import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const get = (url: string) => axios.get(`${BASE_URL}${url}`);

export const getHistoryTracker = () => {
    const url = '/tracker/'
    return get(url)
}

export const getUserDetail = (UserName: string) => {
    const url = `/tracker/${UserName}/`
    return get(url)
}

export const getUsers = () => {
    const url = '/users/'
    return get(url)
}

export const getLeaderBoard = () => {
    const url = '/leaderboard/'
    return get(url)
}
