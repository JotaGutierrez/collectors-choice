up:
	docker compose up -d

down:
	docker compose down

shell:
	docker exec -it node-docker /bin/sh

logs:
	docker logs node-docker

init: up
	docker compose run node yarn install
