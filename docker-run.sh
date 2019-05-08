#! /bin/bash
docker run -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:@192.168.65.1:5432/postgres\
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:v1.0.0-alpha38
