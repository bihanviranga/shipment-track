# Setting up:

## API

- Clone the repo and install the dependencies

```
git clone https://github.com/bihanviranga/shipment-track.git
cd shipment-track
cd server
npm install
```

- Set up the .env file with the following data. Change as neccessary.

```
PORT=8000

DATABASE_URL="postgresql://postgres:admin@localhost:5432/courier"

JWT_SECRET="sample-secret-key"

PASSWORD_SALT_ROUNDS=10
```

- Run the migrations to create the tables and seed the data. This will add an admin account with username 'admin@website.com' and password `admin`.

```
npx prisma migrate dev --name init
npx primsa db seed
```

- Start the server.

```
npm run dev
```

## Frontend

- Install the dependencies.

```
cd client
npm install
```

- Set up the .env file with the following data. Change as neccessary. Secret key must be the same one used in the backend.

```
REACT_APP_JWT_SECRET="sample-secret-key"
```

- Start the server.

```
npm start
```
