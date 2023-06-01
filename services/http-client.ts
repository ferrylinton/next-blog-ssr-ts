type DeleteApiProps = {
    url: string,
    refreshData: () => void,
    context: AppContextType
}

type FormApiProps = {
    url: string,
    data: string,
    refreshData: () => void,
    context: AppContextType
}

type HandleResponseProps = {
    url: string,
    message: string,
    response: Response,
    refreshData: () => void,
    context: AppContextType
}

export const deleteClientApi = async ({ url, refreshData, context }: DeleteApiProps) => {
    try {
        const response = await fetch(url, { method: 'DELETE' });
        const message = 'Data is deleted';
        await handleResponse({ url, message, response, refreshData, context });
    } catch (error: any) {
        context.showErrorToast(error?.message);
    }
}

export const postClientApi = async ({ url, data, refreshData, context }: FormApiProps) => {
    try {

        const response = await fetch(url, {
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        });
        const message = 'Data is created';
        await handleResponse({ url, message, response, refreshData, context });

    } catch (error: any) {
        context.showErrorToast(error?.message);
    }
}

export const putClientApi = async ({ url, data, refreshData, context }: FormApiProps) => {
    try {

        const response = await fetch(url, {
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT'
        });
        const message = 'Data is updated';
        await handleResponse({ url, message, response, refreshData, context });

    } catch (error: any) {
        context.showErrorToast(error?.message);
    }
}

const handleResponse = async ({ url, message, response, refreshData, context }: HandleResponseProps) => {
    const contentType = response.headers.get("content-type");

    if (response.status === 200 && contentType?.indexOf("application/json") !== -1) {
        refreshData();
        context.showSuccessToast(message);
    } else {
        if (contentType && contentType.indexOf("application/json") !== -1) {
            let error = await response.json();
            context.showErrorToast(`${url} : ${response.status} ${error.message}`);
        } else {
            if (url === undefined || url.trim() === '') {
                context.showErrorToast('Url is empty or undefined');
            } else {
                context.showErrorToast(`Error on processing url='${url}'`);
            }

        }
    }
}

