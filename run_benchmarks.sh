#!/bin/bash

BENCHMARK_VERSIONS="0.0.1-alpha-1 0.0.1-alpha-2"

rm -fr .benchmarks_tmp
mkdir .benchmarks_tmp

source .env

for VERSION in $BENCHMARK_VERSIONS; do
  mkdir .benchmarks_tmp/$VERSION

  cd ./.benchmarks_tmp/$VERSION

  git clone --depth 1 --branch $VERSION https://nosachamos:$GITHUB_ACCESS_TOKEN@github.com/nosachamos/fast-data-engine.git .
  yarn
  yarn build

  cd ../..
done
