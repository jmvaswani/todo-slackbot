# Slackbot Project

This is a project that implements a Slackbot using Node.js, Express.js, and MySQL.

## Prerequisites

- Node.js (version 18.16.1) -> Not tested with other versions of Node
- Docker (version 24.0.2) -> Not tested with other versions of Docker

## Installation

1. Clone the repository:

git clone https://github.com/jmvaswani/todo-slackbot

2. Navigate to the `node-server` folder:

cd node-server

3. Install dependencies:

npm install

4. Create a `.env` file:

- Copy `sample.env` to `.env`
- Fill in the required environment variables in the `.env` file

5. Build the Docker image for the server:

docker build -t server-image .

## Usage

### Running the Node.js Server

1. Start the Node.js server:

npm run tsc

(Run this command in one terminal)

2. Start the server using nodemon:

npm run nodemon

(Run this command in a separate terminal)

### Running the MySQL Database

1. Navigate to the `database` folder:

cd ./database

2. Create a `.env` file:

- Copy `sample.env` to `.env`
- Fill in the required environment variables in the `.env` file

3. Start the MySQL database using Docker Compose:

docker-compose up -d

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please follow the guidelines below:

1. Fork the repository.
2. Create a new branch for your contribution.
3. Make your changes and ensure they are well-tested.
4. Commit your changes with a descriptive commit message.
5. Push your changes to your forked repository.
6. Submit a pull request to the main repository.

Please provide detailed information about your changes in the pull request description. It should include:

- A clear description of the problem or feature.
- Steps to reproduce the issue, if applicable.
- Any additional context or information that may be helpful.

## License

MIT License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
