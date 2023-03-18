## API for simple blogging application

#

### Features
 *will be added soon..*


### Schema

#### Tables

1. Users

```sql
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(500) NOT NULL,
	bio VARCHAR(250),
	avatar VARCHAR(500)
)
```
