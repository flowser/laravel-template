import {Options} from 'ky';
import useClient from '@/common/api/client';
import {logoutRoute} from '@/common/api/routes';

export default async function useLogoutRequest(options: Options = {}): Promise<void> {
    const client = useClient(options);

    await client.post(logoutRoute()).json();
}
