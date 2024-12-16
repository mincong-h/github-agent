import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { getRepoInfo } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1m',
});

/**
 * Get the information of a list of Git repositories.
 *
 * @param names a list of repository names to fetch.
 */
export type GetMultiRepoInfoRequest = {
    names: string[];
};
export type GetMultiRepoInfoResponse = {
    count: number;
    items: activities.GetRepoInfoResponse[];
}

/**
 * Get the information of a list of Git repositories.
 *
 * @param request a list of repository names to fetch.
 * @returns the information of the repositories.
 */
export async function getRepoInfos(request: GetMultiRepoInfoRequest): Promise<GetMultiRepoInfoResponse> {
    const responses = await Promise.all(request.names.map((name) => getRepoInfo({ name })));

    return {
        count: responses.length,
        items: responses,
    };
}
