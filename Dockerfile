FROM node:lts-alpine

RUN mkdir -p /home/jura/Projetos/git.rocketseat/gym-point/node_modules && chown -R node:node /home/jura/Projetos/git.rocketseat/gym-point

WORKDIR /home/jura/Projetos/git.rocketseat/gym-point

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3333

CMD ["yarn","start"]
