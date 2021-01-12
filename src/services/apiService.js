import { axioInstance, setToken } from "./api"

export const login = async ({ username, password }) => {
    try {
        const response = await axioInstance.post('/users/authenticate', { username, password });
        setToken(response.data.token);
        localStorage.setItem('jwtToken', response.data.token);
        return response;
    } catch (error) {
        throw error;
    }


}

export const getIssues = async () => {
    const response = await axioInstance.get('/issues');
    return response;
}

export const deleteIssue = async (issuesId) => {
    const response = await axioInstance.get(`/issues/delete/${issuesId}`);
    return response;
}

export const createIssue = async (issue) => {
    const response = await axioInstance.post('/issues/add', issue);
    return response;
}

export const updateIssue = async (issue, id) => {
    const response = await axioInstance.post(`/issues/update/${id}`, issue);
    return response;
}

export const getIssueById = async (id) => {
    const response = await axioInstance.get(`/issues/${id}`);
    return response;
}