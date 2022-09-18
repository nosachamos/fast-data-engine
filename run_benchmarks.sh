#!/bin/bash

BENCHMARK_VERSIONS="0.0.1-alpha-2 1.0.0"

rm -fr .benchmarks_tmp
mkdir .benchmarks_tmp

source .env

for VERSION in $BENCHMARK_VERSIONS; do
  mkdir .benchmarks_tmp/$VERSION

  cd ./.benchmarks_tmp/$VERSION

  git clone --depth 1 --branch $VERSION https://github.com/nosachamos/fast-data-engine.git .
  yarn
  yarn build

  cd ../..
done
