install:
	npm ci
	
test:
	npm test

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff-json:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

gendiff-yaml:
	gendiff __fixtures__/file1.yml __fixtures__/file2.yaml

gendiff-json-yaml:
	gendiff __fixtures__/file1.json __fixtures__/file2.yaml