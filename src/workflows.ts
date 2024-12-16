import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { getRepoInfo } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1m',
});

export async function getRepoWorkflow(name: string): Promise<any> {
    return await getRepoInfo({ name });
}
