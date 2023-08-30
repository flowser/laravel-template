import useClient from '@/common/api/client';
import {loginRoute, registerRoute} from '@/common/api/routes';
import {LOCAL_TOKEN} from '@/common/constants/localStorageKeys';
import {Citizen, citizenParser} from '@/common/parsers/citizenParser';
import unwrap from '@/common/parsers/unwrap';

interface AuthenticateRequestPayload {
    id_number: string;
    password: string;
    remember: boolean;
}
interface RegisterRequestPayload {
    id_number: string;
    first: string;
    last: string;
    password: string;
    phone: string;
    email: string;
}

export default async function useAuthenticateRequest(payload: AuthenticateRequestPayload): Promise<Citizen> {
    const client = useClient();

    const responsePayload = await client.post(loginRoute(), {
        json: payload,
    }).json();

    return unwrap(citizenParser).parse(responsePayload);
}

export async function useLoginRequest(payload: AuthenticateRequestPayload): Promise<Citizen> {
    const client = useClient();

    const responsePayload = await client.post(loginRoute(), {
        json: payload,
    }).json();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStorage.setItem(LOCAL_TOKEN, responsePayload.data.token);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return unwrap(citizenParser).parse({data: responsePayload.data.user});
}

export async function useRegisterRequest(payload: RegisterRequestPayload): Promise<Citizen> {
    const client = useClient();

    const responsePayload = await client.post(registerRoute(), {
        json: payload,
    }).json();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return unwrap(citizenParser).parse({data: responsePayload.data.user});
}
