import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { getRepoInfo } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1m',
});

/**
 * Get the information of a list of Git repositories.
 *
 * @param names a list of repository names to fetch, separated by comma.
 *   For example, "mincong-h/mincong-h.github.io, mincong-h/learning-node"
 * @returns a list of descriptions, one per repository.
 */
export async function getRepos(names: string): Promise<string[]> {
    const repoNames = names.split(',').map((name) => name.trim());

    const responses = await Promise.all(repoNames.map((name) => getRepoInfo({name})));

    return responses.map((resp) => {
        return `The repo ${resp.repo} is owned by ${resp.owner}, and its description is ${resp.description}.
        Visit ${resp.repo_url} for more information.`;
    });
}
