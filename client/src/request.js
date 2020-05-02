const endpoint = 'http://localhost:9000/graphql';

export async function loadJobs() {
    const query = `{
              jobs {
                id
                title
                company {
                  id
                  name
                }
              }
            }`;
    const {jobs} = await graphQLRequest(query);
    return jobs;
}

export async function loadJob(id) {
    const query = `query JobQuery($id: ID!) {
              job(id: $id){
                id
                title
                company {
                  id
                  name
                }
                description
              }
            }`
    const {job} = await graphQLRequest(query, {id});
    return job;
}

export async  function loadCompany(id) {
    const query = `query CompanyQuery($id: ID!) {
      company(id: $id){
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }`;
    const {company} = await graphQLRequest(query, {id});
    return company;
}

async function graphQLRequest(query, variables={}) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ query, variables }),
    });
    const responseBody = await response.json();
    if (responseBody.errors){
        const message = responseBody.errors.map((error) => error.message).join('\n')
        throw new Error(message)
    }
    return responseBody.data;
}