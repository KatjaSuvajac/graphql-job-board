const endpoint = 'http://localhost:9000/graphql';

export async function loadJobs() {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
           query: `{
              jobs {
                id
                title
                company {
                  id
                  name
                }
              }
            }`
        }),
    });

    const responseBody = await response.json();
    console.log(responseBody);
    return responseBody.data.jobs;
}