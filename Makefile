install:
	npm ci
	
test:
	npm test

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff-plain:
	gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json

gendiff:
	gendiff __fixtures__/file1.yml __fixtures__/file2.yaml

gendiff-json:
	gendiff -f json __fixtures__/file1.json __fixtures__/file2.yaml