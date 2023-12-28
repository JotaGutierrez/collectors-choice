up:
	docker compose up -d

down:
	docker compose down

shell:
	docker exec -it node-docker /bin/sh

tests:
	docker exec -i node-docker bash -c "cd /home/node/test && yarn install && yarn test"

logs:
	docker logs node-docker

init: up
	docker compose run node yarn install
