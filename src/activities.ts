import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { Octokit } from "octokit";
import { version } from '../package.json';


const octokit = new Octokit({
    userAgent: `github-agent/v${version}`,
});


type RepoResponse = RestEndpointMethodTypes["repos"]["get"]["response"];


export type GetRepoInfoRequest = {
    name: string; // e.g. "mincong-h/mincong-h.github.io"
}
export type GetRepoInfoResponse = {
    owner: string;
    repo: string;
    repo_url: string;
    clone_url: string;
    description: string | null;
}
export async function getRepoInfo(request: GetRepoInfoRequest): Promise<GetRepoInfoResponse> {
    if (!request.name) {
        throw new Error('Name is required');
    }

    const [owner, repo] = request.name.split('/');
    console.log('requesting information on GitHub...', owner, repo);

    const ghResponse = octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
    }) as RepoResponse;

    console.log('ghResponse.data', ghResponse.data);
    return {
        owner,
        repo,
        repo_url: ghResponse.data.html_url,
        clone_url: ghResponse.data.clone_url,
        description: ghResponse.data.description,
    };
}