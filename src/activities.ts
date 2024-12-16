export interface GetRepoInfoRequest {
    name: string; // e.g. "mincong-h/mincong-h.github.io"
}
export interface GetRepoInfoResponse {
    owner: string;
    repo: string;
    repo_url: string;
    description: string;
}
export async function getRepoInfo(request: GetRepoInfoRequest): Promise<GetRepoInfoResponse> {
    if (!request.name) {
        throw new Error('Name is required');
    }
    if (request.name !== 'mincong-h/mincong-h.github.io') {
        throw new Error('Unknown repository');
    }
    const [owner, repo] = request.name.split('/');
    return {
        owner,
        repo,
        repo_url: `https://github.com/${request.name}`,
        description: 'My personal blog',
    };
}