.DEFAULT_GOAL := all

SHELL := /bin/bash

export PATH := $(shell npm bin):$(PATH)

JSC := webpack
JSFLAGS := --colors --display-error-details --progress

.PHONY: all
all: ## show targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: amp
amp: ## generate AMP pages
	amp "$$(npm prefix)"
	bundle exec sass --load-path ./_sass --style compressed --scss _includes/amp/amp.scss | sed $$'1s/^\\xEF\\xBB\\xBF//' > _includes/amp/amp.css

.PHONY: build
build: ## build posts
	bundle exec jekyll build

.PHONY: compile
compile: ## compile JavaScript
	$(JSC) $(JSFLAGS) --devtool inline-source-map

.PHONY: develop
develop: ## compile JavaScript when changed
	$(JSC) $(JSFLAGS) --devtool inline-source-map --watch

.PHONY: eslint
eslint: ## lint JavaScript
	eslint ./javascript

.PHONY: fixpack
fixpack: ## sort entries within package.json
	fixpack

.PHONY: install
install: ## install modules
	npm install
	bundle install --path vendor/bundle

.PHONY: minify
minify: export NODE_ENV := production
minify: ## minify JavaScript
	$(JSC) $(JSFLAGS) --optimize-minimize

.PHONY: new
new: ## edit new post
	new "$$(npm prefix)"

.PHONY: preview
preview: ## preview website in local
	bundle exec jekyll serve --drafts --watch

.PHONY: publish
publish: ## publish draft posts
	publish "$$(npm prefix)"

.PHONY: stylelint
stylelint: ## lint stylesheets
	stylelint ./_sass/*.scss ./css/*.scss

.PHONY: test
test: eslint stylelint ## test for CI
