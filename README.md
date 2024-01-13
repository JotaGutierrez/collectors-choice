# Collectors Choice
Example of a TypeScript application following Domain-Driven Design (DDD) principles.

## Getting Started

### Docker
The app is ready to run in docker containers.
To install dependencies run:
```bash
make init
```

In further executions simply
```bash
make up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Arquitecture

The idea behind this repo (and clean arquitectures in general) is to isolate model and bussines rules from the apps that may use them. In this particular case, we have

    - src/Core - contains all the entities in Core context with domain, application and infrastructure directories.
    - src/App/UI/Next - Frontend app made with [Next.js](https://nextjs.org/)

Ideally, this should run as two different apps connected via API, but, given that this is a personal project, this is done through Next internal api:

    - src/App/UI/Next/pages/api - contains all the operations needed to create the frontend, making direct use of application and infrastructure services.

All the rest Next related code is isolated from Core. So, we have:
    - Next <--> api <--> Core
being api the "glue" between front and back.

## Learn More

To learn more about clean arquitectures, DDD and so on, take a look at the following resources:

- [Domain Driven Design](https://www.methodsandtools.com/archive/archive.php?id=97)
- [Uncle Bob's clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - This is just an overview. "Clean Architecture" book is highly recomended
- [SOLID principles](https://en.wikipedia.org/wiki/SOLID) - Also an overview. Uncle Bob's "Clean Code" and "Clean Arquitecture" books are recomended.

UI/Next

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Tests

To run backend tests:

```bash
sh ./etc/bash/run-tests.sh
```

# Deploy

> Ansible has been dropped in favor of docker/kubernetes.

## Kubernetes cluster

Repository contains yaml files to set up a Kubernetes cluster and make goals to make things easier

You can follow this steps to set up a local deploy environment

### Pre-requisites
* Local docker
* minikube
* local registry

### Deploy on local Kubernetes

> Caution! This does not take care of MongoDB instance

* Run Minikube and load env vars
```shell
$ minikube start
$ eval $(minikube -p minikube docker-env)
```

* Build and push image to registry
```shell
$ make build-local
$ make push-local
```

* deploy pod on kubernetes
```shell
(first time only) $ make create-local-deployment
$ make deploy-local

```

* Now, just for local testing:
```shell
 kubectl port-forward service/node-service 8080:3000
```

### Make accessible the App
#### Nginx ingress
* install Nginx ingress 

```shell
$ minikube addons enable ingress
$ make nginx-ingress
```

* Ensure load balancer is listening in the proper external IP

>From [Kubernetes bare-metal docs](https://kubernetes.github.io/ingress-nginx/deploy/baremetal/)
```yaml
kind: Service
...
spec:
  externalTrafficPolicy: Local
  type: LoadBalancer
...
```

* Lastly, add proper entry to /etc/hosts
```shell
$ sudo echo $(minikube ip) collectors-choice.local > /etc/hosts
```

## Deploy on premises

> Sadly, my vps has not enough resources to run kubernetes :(
> 
> I had to find another not so fancy solution until I can run a k8s cluster.
> 
> Also, I discarded using Helm due to the simplicity of this project. It adds a lot of complexity for just one deploy environment
### Docker only deploy

* Build local image
```shell
make build-local
docker tag localhost:5000/collectors_choice:latest registry-ip:registry-port/collectors_choice:latest
```

* push to vps registry
```shell
docker login registry-ip:registry-port
docker push registry-ip:registry-port/collectors_choice:latest
```
* on VPS:
```shell
docker login registry-ip:registry-port
docker run -d --name=collectors_choice --restart=unless-stopped -p 3000:3000 registry-ip:registry-port/collectors_choice:latest
```

now we have app running on 3000

## Issues

- Currently, snappy is not working at Core level.

## TODO

- Create an API app to mimic what is now doing Next API to isolate Core
- Use DI for infrastructure services
- Fully migrate to TS
- See @TODOs along the code
