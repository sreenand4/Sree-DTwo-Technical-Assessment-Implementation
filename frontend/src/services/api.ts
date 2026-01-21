const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const createSetting = async (name: string, value: any = {}): Promise<any> => {
    console.log('fontend/services/api.ts: createSetting()')
    const response = await fetch(`${API_URL}/settings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, value }),
    });
    console.log('fontend/services/api.ts: createSetting() response: ', response)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    console.log('fontend/services/api.ts: createSetting() response data: ', data);
    return data;
};

export const getSettings = async (page: number = 1, limit: number = 20): Promise<{ data: any[], meta: any }> => {
    const response = await fetch(`${API_URL}/settings?page=${page}&limit=${limit}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const updateSetting = async (id: string, value: any): Promise<any> => {
    const response = await fetch(`${API_URL}/settings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const deleteSetting = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/settings/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};
