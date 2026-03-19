.PHONY: dev prod init db-generate db-push db-studio clean

# Development
dev:
	docker-compose up dev

# Production
prod:
	docker-compose up prod

# Initialize project inside container
init:
	docker-compose run --rm dev ./bootstrap.sh

# Drizzle commands
db-generate:
	docker-compose exec dev npx drizzle-kit generate

db-push:
	docker-compose exec dev npx drizzle-kit push

db-studio:
	docker-compose exec dev npx drizzle-kit studio

# Cleanup
clean:
	docker-compose down -v --remove-orphans
	rm -rf data/*.db build node_modules/.cache
