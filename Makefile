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

build-local:
	docker build -f ./etc/docker/node/Dockerfile -t localhost:5000/collectors_choice:$(git log --format="%H" -n 1) --target prod  .

push-local:
	docker push localhost:5000/collectors_choice:latest

create-local-deployment:
	kubectl create -f ./etc/k8s/node/node.yaml -f ./etc/k8s/node/service.yaml

deploy-local:
	 kubectl rollout restart deployment --selector=app=node

nginx-ingress:
	kubectl apply -f ./etc/k8s/nginx/nginx.yaml
