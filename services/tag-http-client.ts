type Props = {
    id?: string,
    data?: TagFromType,
    refreshData: () => void,
    showSuccessToast: (message: string) => void,
    showErrorToast: (message: string) => void
}

export const deleteClientApi = async (props: Props) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tags/${props.id}`, { method: 'DELETE' });
        const contentType = response.headers.get("content-type");

        if (response.status === 200) {
            props.refreshData();
            props.showSuccessToast(`Data is deleted`);
        } else {
            if (contentType && contentType.indexOf("application/json") !== -1) {
                let error = await response.json();
                props.showErrorToast(error.message);
            } else {
                let error = await response.text();
                props.showErrorToast(error);
            }
        }

    } catch (error: any) {
        props.showErrorToast(error?.message);
    }
}

export const createOrUpdateClientApi = async (props: Props) => {
    try {
        const url = props.id ? `${process.env.NEXT_PUBLIC_HOST}/api/tags/${props.id}` : `${process.env.NEXT_PUBLIC_HOST}/api/tags`;
        const method = props.id ? 'PUT' : 'POST';

        const res = await fetch(url, {
            body: JSON.stringify(props.data),
            headers: {
                'Content-Type': 'application/json',
            },
            method,
        });


        if (res.status === 200) {
            props.showSuccessToast('Data is saved');
            props.refreshData();
        } else {
            const result = await res.json();
            props.showErrorToast(result.message);
        }

    } catch (error: any) {
        props.showErrorToast(error?.message);
    }
}