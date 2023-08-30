import {array, number, object, output, string} from 'zod';
import {permissionParser} from '@/common/parsers/permissionParser';

export const authenticatedUserParser = object({
    // created_at: string(),
    email: string(),
    id_number: string(),
    image: string().nullable(),
    first: string(),
    id: number(),
    last: string(),
    type: string(),
    permissions: array(permissionParser).nullable(),
    role: string(),
    // updated_at: string(),
});

export type AuthenticatedUser = output<typeof authenticatedUserParser>;
