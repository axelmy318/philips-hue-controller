export const setUpdateSatus = (status, arg) => {
    return {
        type: status,
        payload: {
            data: arg
        }
    }
}