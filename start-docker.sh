#! /bin/bash
docker run -d -p 8080:8080 \
    -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:@postgres:5432/postgres \
    -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
    hasura/graphql-engine:latest
