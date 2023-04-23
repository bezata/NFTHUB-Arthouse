# NFTHUB
# You can mint your NFT on this project and you can exhibit on the page with little bit listing fee. For dacade
# If login screen stuck disconnect your wallet and connect it again(I'll fix that)
# https://bezata.netlify.app/login



# NFT Arthouse dApp on Celo Blockchain

## Introduction

This project is a decentralized application (dApp) built on the Celo blockchain that allows users to create and list their own non-fungible tokens (NFTs) on a showcase. The project uses the Wagmi protocol for authentication and the Pinata API for IPFS file uploads and Astro for framework.

## Getting Started

To run this project locally, you will need to have Node.js and npm installed on your machine. Clone the repository and run `npm install` to install the necessary dependencies.

Create a `.env` file in the root directory and add the following variables:

REACT_APP_WAGMI_CLIENT_ID=<your_wagmi_client_id>
REACT_APP_PINATA_API_KEY=<your_pinata_api_key>
REACT_APP_PINATA_SECRET_API_KEY=<your_pinata_secret_api_key>
REACT_APP_NFTHUB_ADDRESS=<your_nfthub_contract_address>

livecodeserver
Copy

Run `npm run dev` to start the development server.

## Features

* Create and list NFTs on a marketplace
* Upload NFT images to IPFS using Pinata API
* Authenticate users using Wagmi protocol
* View NFT details and minter information on showcase

## Technologies Used
* Astro
* React.js
* Celo blockchain
* Wagmi protocol
* Pinata API
* Solidity

## Contributing

Contributions to this project are welcome. Please open a pull request with any changes or additions.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
