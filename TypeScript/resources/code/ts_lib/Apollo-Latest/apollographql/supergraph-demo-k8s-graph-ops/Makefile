.PHONY: default
default: demo

.PHONY: demo
demo: k8s-up-dev smoke k8s-down

.PHONY: demo-flux
demo-flux: k8s-up-flux-dev smoke k8s-down

.PHONY: k8s-ci
k8s-ci: k8s-ci-dev

.PHONY: k8s-ci-gitops
k8s-ci-gitops: k8s-ci-gitops-dev

.PHONY: k8s-up
k8s-up: k8s-up-dev

.PHONY: k8s-down
k8s-down:
	.scripts/k8s-down.sh

query:
	.scripts/query.sh 80

.PHONY: smoke
smoke:
	.scripts/k8s-smoke.sh

.PHONY: smoke-dev
smoke-dev:
	.scripts/k8s-smoke.sh dev

.PHONY: smoke-stage
smoke-stage:
	.scripts/k8s-smoke.sh stage

.PHONY: smoke-prod
smoke-prod:
	.scripts/k8s-smoke.sh prod

# Local k8s up
.PHONY: k8s-up-dev
k8s-up-dev:
	.scripts/k8s-up.sh dev

.PHONY: k8s-up-stage
k8s-up-stage:
	.scripts/k8s-up.sh stage

.PHONY: k8s-up-prod
k8s-up-prod:
	.scripts/k8s-up.sh prod

# GitOps k8s up with flux
.PHONY: k8s-up-flux
k8s-up-flux: k8s-up-flux-dev

.PHONY: k8s-up-flux-dev
k8s-up-flux-dev:
	.scripts/k8s-up-flux.sh dev

.PHONY: k8s-up-flux-stage
k8s-up-flux-stage:
	.scripts/k8s-up-flux.sh stage

.PHONY: k8s-up-flux-prod
k8s-up-flux-prod:
	.scripts/k8s-up-flux.sh prod

# Local k8s up with Argo Rollouts
.PHONY: k8s-up-bluegreen
k8s-up-bluegreen: k8s-up-dev-bluegreen

.PHONY: k8s-up-dev-bluegreen
k8s-up-dev-bluegreen:
	.scripts/k8s-up.sh dev bluegreen

.PHONY: k8s-up-stage-bluegreen
k8s-up-stage-bluegreen:
	.scripts/k8s-up.sh stage bluegreen

.PHONY: k8s-up-prod-bluegreen
k8s-up-prod-bluegreen:
	.scripts/k8s-up.sh prod bluegreen

# GitOps k8s up with flux and Argo Rollouts
.PHONY: k8s-up-flux-bluegreen
k8s-up-flux-bluegreen: k8s-up-flux-dev-bluegreen

.PHONY: k8s-up-flux-dev-bluegreen
k8s-up-flux-dev-bluegreen:
	.scripts/k8s-up-flux.sh dev bluegreen

.PHONY: k8s-up-flux-stage-bluegreen
k8s-up-flux-stage-bluegreen:
	.scripts/k8s-up-flux.sh stage bluegreen

.PHONY: k8s-up-flux-prod-bluegreen
k8s-up-flux-prod-bluegreen:
	.scripts/k8s-up-flux.sh prod bluegreen

.PHONY: k8s-nginx-dump
k8s-nginx-dump:
	.scripts/k8s-nginx-dump.sh "k8s-nginx-dump"

.PHONY: k8s-graph-dump
k8s-graph-dump:
	.scripts/k8s-graph-dump.sh "k8s-graph-dump"

# CI
.PHONY: k8s-ci-dev
k8s-ci-dev:
	@.scripts/k8s-ci.sh dev

.PHONY: k8s-ci-stage
k8s-ci-stage:
	@.scripts/k8s-ci.sh stage

.PHONY: k8s-ci-prod
k8s-ci-prod:
	@.scripts/k8s-ci.sh prod

# CI GitOps
.PHONY: k8s-ci-gitops-dev
k8s-ci-gitops-dev:
	@.scripts/k8s-ci-gitops.sh dev

.PHONY: k8s-ci-gitops-stage
k8s-ci-gitops-stage:
	@.scripts/k8s-ci-gitops.sh stage

.PHONY: k8s-ci-gitops-prod
k8s-ci-gitops-prod:
	@.scripts/k8s-ci-gitops.sh prod

# GitHub Actions
.PHONY: dep-act
dep-act:
	curl https://raw.githubusercontent.com/nektos/act/master/install.sh | bash -s v0.2.23

ubuntu-latest=ubuntu-latest=catthehacker/ubuntu:act-latest

.PHONY: act
act: act-ci

.PHONY: act-ci
act-ci:
	act -P $(ubuntu-latest) -W .github/workflows/main.yml --detect-event

.PHONY: act-ci-gitops
act-ci-gitops:
	act -P $(ubuntu-latest) -W .github/workflows/ci-gitops.yml --detect-event

.PHONY: act-subgraph-publish
act-subgraph-publish:
	act -P $(ubuntu-latest) -W .github/workflows/subgraph-publish.yml --secret-file graph-api.env

.PHONY: act-supergraph-build-webhook
act-supergraph-build-webhook:
	act -P $(ubuntu-latest) -W .github/workflows/supergraph-build-webhook.yml --secret-file graph-api.env --detect-event

.PHONY: act-rebase
act-rebase:
	act -P $(ubuntu-latest) -W .github/workflows/rebase.yml -s GITHUB_TOKEN --detect-event

# Util
.PHONY: docker-prune
docker-prune:
	.scripts/docker-prune.sh

.PHONY: fetch-dev
fetch-dev:
	.scripts/fetch.sh dev

.PHONY: fetch-stage
fetch-stage:
	.scripts/fetch.sh stage

.PHONY: fetch-prod
fetch-prod:
	.scripts/fetch.sh stage

.PHONY: promote-dev-stage
promote-dev-stage:
	cp infra/dev/kustomization.yaml infra/stage
	cp subgraphs/dev/kustomization.yaml subgraphs/stage
	cp router/dev/kustomization.yaml router/stage
	cp test/dev/smoke.sh test/stage

.PHONY: promote-stage-prod
promote-stage-prod:
	cp infra/stage/kustomization.yaml infra/prod
	cp subgraphs/stage/kustomization.yaml subgraphs/prod
	cp router/stage/kustomization.yaml router/prod
	cp test/stage/smoke.sh test/prod
