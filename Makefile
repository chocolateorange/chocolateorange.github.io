.DEFAULT_GOAL := all

SHELL := /bin/bash

export PATH := $(shell npm bin):$(PATH)

JSC := webpack
JSFLAGS := --colors --display-error-details --progress

.PHONY: all
all: ## show targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

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

.PHONY: update-amp-cache
update-amp-cache: prefix := https://cdn.ampproject.org/update-ping/c/s/chocolateorange.github.io
update-amp-cache: ## update AMP cache within Google
	find -L _amp -type f -exec basename {} + | sed -e 's|-|/|g' -e 's|.md$$||' | xargs -n 1 -I {} bash -c 'printf -- "%s\n" "$(prefix)/{}" && curl -X GET -i "$(prefix)/{}"'

.PHONY: minify-amp-stylesheet
minify-amp-stylesheet: URI1 := https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css
minify-amp-stylesheet: URI2 := https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/fonts
minify-amp-stylesheet: ## minify stylesheets for AMP
	uncss --raw "$$(curl -L $(URI1))" './_site/amp/**/*.html' | sed -e 's|../fonts|$(URI2)|g' | grep -v 'Powered by AMP' > _sass/amp/ionicons.scss
