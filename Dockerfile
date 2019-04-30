FROM node:8.12-alpine AS base
WORKDIR /code
EXPOSE 3000

FROM base AS build
COPY package.json yarn.lock ./
RUN yarn install --production=false
COPY tsconfig.json  ./

COPY src/ ./src
RUN yarn build

FROM build as clean
RUN yarn install --production
RUN rm -rf ./src

FROM base AS production
LABEL Name="Ripley Labs Test" Version="1.0"
ARG ENVIRONMENT="production"
ENV NODE_ENV=${ENVIRONMENT}
COPY --from=clean /code ./
CMD ["npm", "start"]
