import {Options} from 'ky';
import useClient from '@/common/api/client';
import {authRoute} from '@/common/api/routes';
import unwrap from '@/common/parsers/unwrap';
import {AuthenticatedUser, authenticatedUserParser} from '@/common/parsers/userParser';
import {response} from '@/common/types/types';

export default async function useCurrentAuthRequest(options: Options = {}): Promise<AuthenticatedUser> {
    const client = useClient(options);
    const data: response = await client.get(authRoute()).json();
    return unwrap(authenticatedUserParser).parse({data: data.data});
}
