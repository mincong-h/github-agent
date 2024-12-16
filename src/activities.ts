import { Octokit } from "@octokit/core";


const octokit = new Octokit();


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

    const [owner, repo] = request.name.split('/');
    const ghResponse = await octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
    });
    const repoInfo = ghResponse.data;
    console.log('repoInfo', repoInfo);

    const response = {
        owner,
        repo,
        repo_url: `https://github.com/${request.name}`,
    } as GetRepoInfoResponse;

    if (request.name == 'mincong-h/learning-node') {
        response.description = 'A repository to learn Node.js';
    }
    if (request.name == 'mincong-h/mincong-h.github.io') {
        response.description = "Mincong Huang's personal website";
    }

    return response;
}